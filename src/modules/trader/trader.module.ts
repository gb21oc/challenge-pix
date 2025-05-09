/*
https://docs.nestjs.com/modules
*/

import { TraderService } from './trader.service';
import { TraderController } from './trader.controller';
import { Module } from '@nestjs/common';

@Module({
    imports: [],
    controllers: [
        TraderController,],
    providers: [
        TraderService,],
})
export class TraderModule { }
