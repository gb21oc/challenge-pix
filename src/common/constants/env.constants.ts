/**
 * Chave gerada através do comando:
 * node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
 * ela possui 256 bits ou 32 bytes
 * @returns string
 */
export const SALT_KEY = () => process.env.SALT_KEY