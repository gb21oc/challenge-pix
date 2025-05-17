/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TraderEntity, UserEntity } from 'src/infra/database/entity';
import { PixEntity } from 'src/infra/database/entity/pix.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, PixEntity, TraderEntity])
    ],
    controllers: [
        PaymentController,],
    providers: [
        PaymentService,],
})
export class PaymentModule { }
