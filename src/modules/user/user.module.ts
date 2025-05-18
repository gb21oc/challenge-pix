/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/infra/database/entity';
import { WalletEntity } from 'src/infra/database/entity/wallet.entity';
import { PixService } from 'src/service/pix/pix.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, WalletEntity]),
    ],
    controllers: [
        UserController,],
    providers: [
        UserService,
        PixService
    ],
})
export class UserModule { }
