/*
https://docs.nestjs.com/providers#services
*/

import { v4 as uuidv4 } from 'uuid';
import { FastifyReply } from 'fastify';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, EntityManager, QueryFailedError } from 'typeorm';
import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { PIX_TYPE_ENUM } from 'src/common/enums';
import { UserService } from '../user/user.service';
import { DEFAULT_MESSAGE } from 'src/common/constants';
import { PixService } from 'src/service/pix/pix.service';
import { TraderEntity } from 'src/infra/database/entity';
import { TraderDTO } from './dto/trader.dto';

@Injectable()
export class TraderService {
    constructor(
        private readonly _pixService: PixService,
        private readonly _dataSource: DataSource,
        @InjectRepository(TraderEntity) private readonly _traderEntity: Repository<TraderEntity>
    ) { }

    private readonly logger = new Logger(UserService.name)

    async saveUser(manager: EntityManager, trader) {
        try {
            await manager.getRepository(TraderEntity).save(trader)
            const pix = await this._pixService.savePix(
                {
                    type: PIX_TYPE_ENUM.TRADER,
                    userId: null,
                    traderId: trader.id
                },
                manager
            )
            delete trader.password
            return { ...trader, pixId: pix.id }
        } catch (e) {
            if (e instanceof HttpException) throw e
            this.logger.error(e.message)
            if (e instanceof QueryFailedError) throw new BadRequestException(DEFAULT_MESSAGE)
        }
    }

    async createTrader(body: TraderDTO, res: FastifyReply) {
        try {
            const user = { ...body, id: uuidv4() }
            const result = await this._dataSource.transaction(async (manager) => await this.saveUser(manager, user))
            return res.send(result)
        } catch (e) {
            if (e instanceof HttpException) throw e
            this.logger.error(e.message)
            throw new InternalServerErrorException()
        }
    }

    async getAllTraders(res: FastifyReply) {
        try {
            const options = {
                select: {
                    cnpj: true,
                    email: true,
                    fullName: true,
                    id: true
                }
            }
            const trader = await this._traderEntity.find(options)
            return res.send(trader)
        } catch (e) {
            if (e instanceof HttpException) throw e
            this.logger.error(e.message)
            throw new InternalServerErrorException()
        }
    }
}

