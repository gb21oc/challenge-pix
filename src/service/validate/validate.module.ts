import { ValidateService } from './validate.service';
/*
https://docs.nestjs.com/modules
*/

import { Global, Module } from '@nestjs/common';

@Global()
@Module({
    providers: [
        ValidateService,],
    exports: [
        ValidateService,]
})
export class ValidateModule { }
