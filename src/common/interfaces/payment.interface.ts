import { PaymentDTO } from "src/modules/payment/dto/payment.dto";

export interface Payment extends PaymentDTO {
    userId: string
}