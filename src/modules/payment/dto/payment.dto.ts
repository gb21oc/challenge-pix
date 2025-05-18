import { IsNotEmpty, IsNumber, IsNumberString, IsString, Length } from "class-validator"
import { IsValidCPF } from "src/common/decorator/dto/isCpf.decorator.dto";

// TODO: deixar o CPF e email como opcional pois pode ser realizado a busca por qualquer um dos dois
export class PaymentDTO {
    @IsString()
    @IsNotEmpty()
    @IsValidCPF()
    cpf: string

    @IsNumberString()
    @IsNotEmpty()
    @Length(14, 14)
    cnpj: string;

    @IsNumber()
    @IsNotEmpty()
    amount: number
}