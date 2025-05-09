/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { TraderService } from './trader.service';
import { FastifyReply } from 'fastify';
import { TraderDTO } from './dto/trader.dto';

@Controller("trader")
export class TraderController {
    constructor(
        private readonly _traderService: TraderService
    ) { }

    @Get("health")
    @HttpCode(200)
    health(@Res() res: FastifyReply) {
        return res.send("OK")
    }

    @Get()
    @HttpCode(200)
    async get(@Res() res: FastifyReply) {
        return await this._traderService.getAllTraders(res)
    }

    @Post()
    @HttpCode(201)
    async post(@Body() body: TraderDTO, @Res() res: FastifyReply) {
        return this._traderService.createTrader(body, res)
    }
}
