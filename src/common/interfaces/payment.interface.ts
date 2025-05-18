
import { WalletEntity } from "src/infra/database/entity/wallet.entity";
import { PaymentDTO } from "src/modules/payment/dto/payment.dto";
import { TraderDTO } from "src/modules/trader/dto/trader.dto";
import { UserDTO } from "src/modules/user/dto/user.dto";

type TWalletEntity = WalletEntity

export interface Payment extends PaymentDTO {
    userId: string
}

export interface Wallet extends Pick<TWalletEntity, "userId" | "traderId">, Pick<PaymentDTO, "amount"> {
    userCpf: UserDTO["cpf"]
    traderCnpj: TraderDTO["cnpj"]
    paymentId: string
}