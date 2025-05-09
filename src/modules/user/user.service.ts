/*
https://docs.nestjs.com/providers#services
*/

import { v4 as uuidv4 } from 'uuid';
import { DataSource, EntityManager, QueryFailedError, Repository } from 'typeorm';
import { FastifyReply } from 'fastify';
import { InjectRepository } from '@nestjs/typeorm';
import { BadRequestException, HttpException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';

import { UserEntity } from 'src/infra/database/entity';
import { UserDTO } from './dto/user.dto';
import { PixService } from 'src/service/pix/pix.service';
import { PIX_TYPE_ENUM } from 'src/common/enums';
import { DEFAULT_MESSAGE } from 'src/common/constants';

@Injectable()
export class UserService {
    constructor(
        private readonly _pixService: PixService,
        private readonly _dataSource: DataSource,
        @InjectRepository(UserEntity) private readonly _userEntity: Repository<UserEntity>
    ) { }

    private readonly logger = new Logger(UserService.name)

    async saveUser(manager: EntityManager, user) {
        try {
            await manager.getRepository(UserEntity).save(user)
            const pix = await this._pixService.savePix(
                {
                    type: PIX_TYPE_ENUM.USER,
                    userId: user.id,
                    traderId: null
                },
                manager
            )
            delete user.password
            return { ...user, pixId: pix.id }
        } catch (e) {
            this.logger.error(e.message)
            if (e instanceof QueryFailedError) throw new BadRequestException(DEFAULT_MESSAGE)
        }
    }

    async createUser(body: UserDTO, res: FastifyReply) {
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

    async getAllUsers(res: FastifyReply) {
        try {
            const options = {
                select: {
                    cpf: true,
                    email: true,
                    fullName: true,
                    id: true
                }
            }
            const users = await this._userEntity.find(options)
            return res.send(users)
        } catch (e) {
            console.log("getAllUsers: ", e)
            throw new InternalServerErrorException()
        }
    }
}
