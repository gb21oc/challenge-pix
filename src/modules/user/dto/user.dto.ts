import { Transform } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { IsValidCPF } from "src/common/decorator/dto/isCpf.decorator.dto";
import { Hashing } from "src/common/decorator/dto/password-hash.decorator.dto";
import { UserEntity } from "src/infra/database/entity";

export class UserDTO implements Omit<UserEntity, "id"> {
    @IsString()
    @IsNotEmpty()
    @IsValidCPF()
    cpf: string;

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