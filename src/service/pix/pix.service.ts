import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';
import { BadRequestException, HttpException, InternalServerErrorException, Logger } from "@nestjs/common"

import { PixDTO } from "./dto/pix.dto";
import { WALLET_TYPE_ENUM } from "src/common/enums";
import { ValidateService } from "../validate/validate.service";
import { WalletEntity } from "src/infra/database/entity/wallet.entity";
import { REQUIRED_TRADER, REQUIRED_USER, SALT_KEY } from "src/common/constants";

export class PixService {
    constructor(
        private readonly _validate: ValidateService,
        @InjectRepository(WalletEntity) private readonly _walletEntity: Repository<WalletEntity>,
    ) { }
    private readonly algorithm = 'aes-256-cbc';
    private readonly key = Buffer.from(SALT_KEY(), 'hex'); // 32 bytes
    private readonly logger = new Logger(PixService.name)

    async savePix(pix: PixDTO, manager?: EntityManager) {
        try {
            if (!pix.userId && pix.type === WALLET_TYPE_ENUM.USER) throw new BadRequestException(REQUIRED_USER)
            if (!pix.traderId && pix.type === WALLET_TYPE_ENUM.TRADER) throw new BadRequestException(REQUIRED_TRADER)
            const updatePix: PixDTO = { ...pix, created_at: new Date().toLocaleString(), updated_at: new Date().toLocaleString() }
            const error = await this._validate.dto(new PixDTO(updatePix))
            if (error) throw new BadRequestException(error)
            const repository = manager
                ? manager.getRepository(WalletEntity)
                : this._walletEntity;
            return repository.save(updatePix)
        } catch (e) {
            this.logger.error(e.message)
            if (e instanceof HttpException) throw e
            throw new InternalServerErrorException(e)
        }
    }

    /**
     * Foi escolhido a criptografia "aes-256-cbc"
     * aes - AES (Advanced Encryption Standard)
     * 256 - significa que a chave tem 256 bits ou 32 bytes
     * cbc - modo de operação chamado Cipher Block Chaining
     * 
     * A variável "iv" significa Initialization Vector(vetor de inicialização) que é
     * uma sequência de bytes gerada aleatoriamente usada em criptografia simétrica
     * 
     * Retorna uma sequencia de caracteres que contém as informações recebidas
     * @param data dado a ser encriptado para gerar o pix copia e cola
     * @returns 
     */
    encryptPix(data: string) {
        const iv = randomBytes(16); // 16 bytes IV
        const cipher = createCipheriv(this.algorithm, this.key, iv);
        const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
        const paymentID = iv.toString('hex') + ':' + encrypted.toString('hex')
        return paymentID
    }

    decryptPix(pixEncrypt: string) {
        const [ivHex, encryptedHex] = pixEncrypt.split(':');
        const iv = Buffer.from(ivHex, 'hex');
        const encrypted = Buffer.from(encryptedHex, 'hex');
        const decipher = createDecipheriv(this.algorithm, this.key, iv);
        const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
        return decrypted.toString('utf8');
    }
}