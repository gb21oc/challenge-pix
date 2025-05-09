import { IsString, IsNotEmpty, Length, IsNumberString } from "class-validator";
import { Hashing } from "src/common/decorator/dto/password-hash.decorator.dto";
import { TraderEntity } from "src/infra/database/entity";

export class TraderDTO implements Omit<TraderEntity, "id"> {
    @IsNumberString()
    @IsNotEmpty()
    @Length(14, 14)
    cnpj: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @Hashing()
    password: string;

    @IsString()
    @IsNotEmpty()
    fullName: string;
}