import { IsDateString, IsEnum, IsOptional, IsString, IsUUID } from "class-validator";
import { WALLET_TYPE_ENUM } from "src/common/enums";
import { WalletEntity } from "src/infra/database/entity/wallet.entity";

export class PixDTO implements Omit<WalletEntity, "id" | "created_at" | "user" | "userId" | "trader" | "balance" | "updated_at"> {
    @IsUUID()
    @IsOptional()
    userId?: string;

    @IsUUID()
    @IsOptional()
    traderId?: string;

    @IsEnum(WALLET_TYPE_ENUM)
    type: WALLET_TYPE_ENUM;

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