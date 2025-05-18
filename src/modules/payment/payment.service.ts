/*
https://docs.nestjs.com/providers#services
*/

import Decimal from 'decimal.js';
import { v4 as uuidv4 } from 'uuid';
import { FastifyReply } from 'fastify';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { PixEntity } from 'src/infra/database/entity';
import { Payment, Wallet } from 'src/common/interfaces';
import { PixService } from 'src/service/pix/pix.service';
import { WalletEntity } from 'src/infra/database/entity/wallet.entity';
import { PIX_STATUS, PIX_STATUS_MESSAGE } from 'src/common/enums/pix-status.enum';
import { AMOUNT_IS_NOT_ZERO, DEFAULT_MESSAGE, EXPIRE_AT_PIX, PIX_EXCEEDS_ACOUNT_AMOUNT, PIX_EXPIRED, PIX_IS_NOT_NEGATIVE, PIX_NOT_FOUND } from 'src/common/constants';

@Injectable()
export class PaymentService {
    constructor(
        private readonly _dataSource: DataSource,
        private readonly _pixService: PixService,
        @InjectRepository(WalletEntity) private readonly _walletEntity: Repository<WalletEntity>,
        @InjectRepository(PixEntity) private readonly _pixEntity: Repository<PixEntity>
    ) { }

    /**
     * 
     * @param param0 
     * @returns [pixUser, pixTrader]
     */
    private async getInformationUserAndTrader(
        {
            cnpj,
            cpf,
            userId
        }: Pick<Payment, "cnpj" | "cpf" | "userId">
    ) {
        return Promise.all([
            this._walletEntity.findOne({
                where: {
                    user: { id: userId, cpf: cpf }
                },
                relations: ['user'],
            }),
            this._walletEntity.findOne({
                where: {
                    trader: { cnpj: cnpj }
                },
                relations: ['trader'],
            })
        ])
    }

    /**
     * 
     * @param userId 
     * @param newBalanceUser 
     * @param traderId 
     * @param newBalanceTrader 
     * @returns [UpdateResult, UpdateResult] -> [userUpdate, traderUpdate]
     */
    private updateBalance(
        userId: string,
        newBalanceUser: string,
        traderId: string,
        newBalanceTrader: string,
        paymentId: string
    ) {
        return this._dataSource.transaction(async (manager) => {
            const managerWallet = await manager.getRepository(WalletEntity)
            const managetPix = await manager.getRepository(PixEntity)
            const updateBalance = await Promise.all([
                managerWallet.update({ userId: userId }, {
                    balance: newBalanceUser,
                    updated_at: new Date().toLocaleString()
                }),
                managerWallet.update({ traderId: traderId }, {
                    balance: newBalanceTrader,
                    updated_at: new Date().toLocaleString()
                }),
                managetPix.update({ id: paymentId }, {
                    status: PIX_STATUS.COMPLETED,
                    updated_at: new Date().toLocaleString()
                })
            ])
            return updateBalance
        })
    }

    async createPayment(body: Payment, res: FastifyReply) {
        const { amount } = body
        if (amount === 0) throw new BadRequestException(AMOUNT_IS_NOT_ZERO)
        const [pixUser, pixTrader] = await this.getInformationUserAndTrader(body)
        if (!pixUser || !pixTrader) throw new BadRequestException(DEFAULT_MESSAGE)
        const balanceUser = new Decimal(pixUser.balance)
        const bodyBalance = new Decimal(body.amount)
        if (bodyBalance.isNegative()) throw new BadRequestException(PIX_IS_NOT_NEGATIVE)
        if (balanceUser.lt(bodyBalance)) throw new BadRequestException(PIX_EXCEEDS_ACOUNT_AMOUNT)
        const { userId, user } = pixUser
        const { traderId, trader } = pixTrader
        const paymentIdLogPix = uuidv4()
        const payment = JSON.stringify({
            userId,
            userCpf: user.cpf,
            traderId,
            traderCnpj: trader.cnpj,
            amount,
            paymentId: paymentIdLogPix
        })
        const paymentID = this._pixService.encryptPix(payment)
        const saveLogPix: PixEntity = {
            id: paymentIdLogPix,
            amount: `${amount}`,
            status: PIX_STATUS.PENDING,
            paymentId: paymentID,
            qrCode: '',
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString(),
            expires_at: new Date(EXPIRE_AT_PIX()),
            userId,
            traderId
        }
        await this._pixEntity.save(saveLogPix)
        return res.send({ paymentID })
    }

    async confirmPayment(pix: string, res: FastifyReply) {
        const {
            amount,
            traderCnpj,
            traderId,
            userCpf,
            userId,
            paymentId
        }: Wallet = JSON.parse(this._pixService.decryptPix(pix))
        const paymentPix = await this._pixEntity.findOne(
            {
                where: {
                    id: paymentId,
                }
            }
        )
        if (!paymentPix) throw new BadRequestException(PIX_NOT_FOUND)
        if (paymentPix.status !== PIX_STATUS.PENDING) throw new BadRequestException(PIX_STATUS_MESSAGE[paymentPix.status])
        if (new Date() > paymentPix.expires_at) {
            await this._pixEntity.update({ id: paymentId }, {
                status: PIX_STATUS.EXPIRED,
                updated_at: new Date().toLocaleString()
            })
            throw new BadRequestException(PIX_EXPIRED)
        }
        const [pixUser, pixTrader] = await this.getInformationUserAndTrader(
            {
                cnpj: traderCnpj,
                cpf: userCpf,
                userId: userId
            }
        )
        if (!pixUser || !pixTrader) throw new BadRequestException(DEFAULT_MESSAGE)
        const bodyBalance = new Decimal(amount)
        if (bodyBalance.isNegative()) throw new BadRequestException(PIX_IS_NOT_NEGATIVE)
        const balanceTrader = new Decimal(pixTrader.balance)
        const balanceUser = new Decimal(pixUser.balance)
        if (balanceUser.lt(bodyBalance)) throw new BadRequestException(PIX_EXCEEDS_ACOUNT_AMOUNT)
        const newBalanceUser = balanceUser.minus(bodyBalance).toFixed(2)
        const newBalanceTrader = balanceTrader.plus(bodyBalance).toFixed(2)
        await this.updateBalance(
            userId,
            newBalanceUser,
            traderId,
            newBalanceTrader,
            paymentId
        )
        return {
            paymentId,
            status: PIX_STATUS.COMPLETED
        }
    }
}
