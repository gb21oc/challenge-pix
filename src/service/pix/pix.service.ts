import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PixEntity } from "src/infra/database/entity/pix.entity";
import { BadRequestException, HttpException, InternalServerErrorException, Logger } from "@nestjs/common"

import { PixDTO } from "./dto/pix.dto";
import { PIX_TYPE_ENUM } from "src/common/enums";
import { ValidateService } from "../validate/validate.service";
import { REQUIRED_TRADER, REQUIRED_USER } from "src/common/constants";

export class PixService {
    constructor(
        private readonly _validate: ValidateService,
        @InjectRepository(PixEntity) private readonly _pixEntity: Repository<PixEntity>,
    ) { }
    private readonly logger = new Logger(PixService.name)

    async savePix(pix: PixDTO, manager?: EntityManager) {
        try {
            if (!pix.userId && pix.type === PIX_TYPE_ENUM.USER) throw new BadRequestException(REQUIRED_USER)
            if (!pix.traderId && pix.type === PIX_TYPE_ENUM.TRADER) throw new BadRequestException(REQUIRED_TRADER)
            const updatePix: PixDTO = { ...pix, created_at: new Date().toLocaleString(), updated_at: new Date().toLocaleString() }
            const error = await this._validate.dto(new PixDTO(updatePix))
            if (error) throw new BadRequestException(error)
            const repository = manager
                ? manager.getRepository(PixEntity)
                : this._pixEntity;
            return repository.save(updatePix)
        } catch (e) {
            this.logger.error(e.message)
            if (e instanceof HttpException) throw e
            throw new InternalServerErrorException(e)
        }
    }
}