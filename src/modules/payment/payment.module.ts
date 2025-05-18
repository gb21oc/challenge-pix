/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PixService } from 'src/service/pix/pix.service';
import { PixEntity, TraderEntity, UserEntity, WalletEntity } from 'src/infra/database/entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, TraderEntity, WalletEntity, PixEntity])
    ],
    controllers: [
        PaymentController,],
    providers: [
        PaymentService,
        PixService
    ],
})
export class PaymentModule { }
