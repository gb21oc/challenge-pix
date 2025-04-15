import { Module } from "@nestjs/common";
import { ConfigModule as ConfigEnvModule } from "@nestjs/config"

@Module({
  imports: [
    ConfigEnvModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
    })
  ]
})
export class ConfigModule { }