import { Module } from '@nestjs/common';

import { UserModule } from './user/user.module';
import { TraderModule } from './trader/trader.module';
import { ConfigModule } from 'src/config/config.module';
import { PaymentModule } from './payment/payment.module';
import { ValidateModule } from './../service/validate/validate.module';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [
    PaymentModule,
    TraderModule,
    ValidateModule,
    UserModule, ConfigModule, DatabaseModule],
})
export class AppModule { }
