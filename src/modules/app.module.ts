import { Module } from '@nestjs/common';
import { ConfigModule } from 'src/config/config.module';
import { DatabaseModule } from 'src/infra/database/database.module';

@Module({
  imports: [ConfigModule, DatabaseModule],
})
export class AppModule { }
