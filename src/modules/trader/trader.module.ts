/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TraderService } from './trader.service';
import { TraderController } from './trader.controller';
import { PixEntity } from 'src/infra/database/entity/pix.entity';
import { TraderEntity } from './../../infra/database/entity/trader.entity';
import { PixService } from 'src/service/pix/pix.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([TraderEntity, PixEntity]),
    ],
    controllers: [
        TraderController,],
    providers: [
        TraderService,
        PixService
    ],
})
export class TraderModule { }
