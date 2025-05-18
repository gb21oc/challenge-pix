export enum PIX_STATUS {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    EXPIRED = 'EXPIRED',
    CANCELLED = 'CANCELLED',
    FAILED = 'FAILED'
}

export enum PIX_STATUS_MESSAGE {
    PENDING = 'Aguardando pagamento!',
    COMPLETED = 'Pagamento já realizado!',
    EXPIRED = 'Pagamento expirado!',
    CANCELLED = 'Pagamento cancelado',
    FAILED = 'Ocorreu um erro no pagamento'
}