import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { PIX_TYPE_ENUM } from "src/common/enums";
import { PixEntity } from "src/infra/database/entity/pix.entity";

export class PixDTO implements Omit<PixEntity, "id" | "created_at" | "user" | "userId" | "trader" | "balance" | "updated_at"> {
    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsUUID()
    @IsOptional()
    traderId?: string;

    @IsEnum(PIX_TYPE_ENUM)
    type: PIX_TYPE_ENUM;

    @IsString()
    @IsOptional()
    created_at?: string;

    @IsString()
    @IsOptional()
    updated_at?: string;

    /**
     *
     */
    constructor(payload: Partial<PixDTO>) {
        Object.assign(this, payload)
    }
}