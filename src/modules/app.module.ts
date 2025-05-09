
import { ValidateModule } from './../service/validate/validate.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/infra/database/database.module';
import { TraderModule } from './trader/trader.module';

@Module({
  imports: [
    TraderModule,
    ValidateModule,
    UserModule, ConfigModule, DatabaseModule],
})
export class AppModule { }
