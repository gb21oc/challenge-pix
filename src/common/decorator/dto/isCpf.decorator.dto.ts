import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsValidCPF(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: {
                validate(value: string, args: ValidationArguments) {
                    if (typeof value !== 'string') return false;
                    const cpf = value.replace(/[^\d]+/g, '');
                    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
                    let sum = 0;
                    for (let i = 0; i < 9; i++) {
                        sum += parseInt(cpf.charAt(i)) * (10 - i);
                    }
                    let rest = (sum * 10) % 11;
                    if (rest === 10 || rest === 11) rest = 0;
                    if (rest !== parseInt(cpf.charAt(9))) return false;
                    sum = 0;
                    for (let i = 0; i < 10; i++) {
                        sum += parseInt(cpf.charAt(i)) * (11 - i);
                    }
                    rest = (sum * 10) % 11;
                    if (rest === 10 || rest === 11) rest = 0;
                    return rest === parseInt(cpf.charAt(10));
                },
                defaultMessage(args: ValidationArguments) {
                    return `CPF ${args.property} is not valid.`;
                },
            },
        });
    }
}