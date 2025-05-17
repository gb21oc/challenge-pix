/*
https://docs.nestjs.com/providers#services
*/

import Decimal from 'decimal.js';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';

import { Payment } from 'src/common/interfaces';
import { PixEntity } from 'src/infra/database/entity/pix.entity';
import { AMOUNT_IS_NOT_ZERO, DEFAULT_MESSAGE, PIX_EXCEEDS_ACOUNT_AMOUNT, PIX_IS_NOT_NEGATIVE } from 'src/common/constants';
import { FastifyReply } from 'fastify';

@Injectable()
export class PaymentService {
    constructor(
        private readonly _dataSource: DataSource,
        @InjectRepository(PixEntity) private readonly _pixEntity: Repository<PixEntity>
    ) { }

    /**
     * 
     * @param userId 
     * @param newBalanceUser 
     * @param traderId 
     * @param newBalanceTrader 
     * @returns [UpdateResult, UpdateResult] -> [userUpdate, traderUpdate]
     */
    private updateBalance(userId: string, newBalanceUser: string, traderId: string, newBalanceTrader: string) {
        return this._dataSource.transaction(async (manager) => {
            const managerPix = await manager.getRepository(PixEntity)
            const updateBalance = await Promise.all([
                managerPix.update({ userId: userId }, {
                    balance: newBalanceUser,
                    updated_at: new Date().toLocaleString()
                }),
                managerPix.update({ traderId: traderId }, {
                    balance: newBalanceTrader,
                    updated_at: new Date().toLocaleString()
                })
            ])
            return updateBalance
        })
    }

    async sendPix(body: Payment, res: FastifyReply) {
        if (body.amount === 0) throw new BadRequestException(AMOUNT_IS_NOT_ZERO)
        const [pixUser, pixTrader] = await Promise.all([
            await this._pixEntity.findOne({
                where: {
                    user: { id: body.userId, cpf: body.cpf }
                },
                relations: ['user'],
            }),
            await this._pixEntity.findOne({
                where: {
                    trader: { cnpj: body.cnpj }
                },
                relations: ['trader'],
            })
        ])
        if (!pixUser || !pixTrader) throw new BadRequestException(DEFAULT_MESSAGE)
        const balanceTrader = new Decimal(pixTrader.balance)
        const balanceUser = new Decimal(pixUser.balance)
        const bodyBalance = new Decimal(body.amount)
        if (bodyBalance.isNegative()) throw new BadRequestException(PIX_IS_NOT_NEGATIVE)
        if (balanceUser.lt(bodyBalance)) throw new BadRequestException(PIX_EXCEEDS_ACOUNT_AMOUNT)
        const newBalanceUser = balanceUser.minus(bodyBalance).toFixed(2)
        const newBalanceTrader = balanceTrader.plus(bodyBalance).toFixed(2)
        await this.updateBalance(
            pixUser.userId,
            newBalanceUser,
            pixTrader.traderId,
            newBalanceTrader
        )
        return res.send({
            userBalance: newBalanceUser
        })
    }
}
