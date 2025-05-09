/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { validate } from 'class-validator';

@Injectable()
export class ValidateService {

    async dto(dto: object) {
        const errors = await validate(dto);
        if (errors?.length > 0) {
            const formattedErrors = errors.map(err => {
                const constraints = err.constraints
                if (constraints) return {
                    property: err.property,
                    error: Object.values(constraints)
                }
            });
            console.log(formattedErrors)
            return formattedErrors;
        }
    }

}
