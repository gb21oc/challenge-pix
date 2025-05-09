/*
https://docs.nestjs.com/controllers#controllers
*/

import { FastifyReply } from "fastify"
import { Body, Controller, Get, HttpCode, Post, Res } from '@nestjs/common';
import { UserService } from "./user.service";
import { UserDTO } from "./dto/user.dto";

@Controller("user")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) { }

    @Get("health")
    @HttpCode(200)
    health(@Res() res: FastifyReply) {
        return res.send("OK")
    }

    @Get()
    @HttpCode(200)
    async get(@Res() res: FastifyReply) {
        return await this.userService.getAllUsers(res)
    }

    @Post()
    @HttpCode(201)
    async post(@Body() body: UserDTO, @Res() res: FastifyReply) {
        return this.userService.createUser(body, res)
    }
}
