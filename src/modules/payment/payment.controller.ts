/*
https://docs.nestjs.com/controllers#controllers
*/

import { FastifyReply } from 'fastify';
import { Controller, Post, Res, HttpCode, Get, Body, Param } from '@nestjs/common';

import { PaymentDTO } from './dto/payment.dto';
import { Payment } from 'src/common/interfaces';
import { PaymentService } from './payment.service';

@Controller("payment")
export class PaymentController {
    constructor(
        private readonly _paymentService: PaymentService
    ) { }

    @Get("health")
    @HttpCode(200)
    health(@Res() res: FastifyReply) {
        return res.send("OK")
    }

    @Post("create/:userId")
    async createPayment(@Body() body: PaymentDTO, @Param("userId") userId: string, @Res() res: FastifyReply) {
        const payment: Payment = { ...body, userId }
        return await this._paymentService.createPayment(payment, res)
    }

    @Post("confirm")
    @HttpCode(201)
    async post(@Body("pix") paymentId: string, @Res() res: FastifyReply) {
        return await this._paymentService.confirmPayment(paymentId, res)
    }


}
