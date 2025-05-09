import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { FastifyConstants } from './common/constants';
import { FastifyConfig } from './config/fastify.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  FastifyConfig.config(app)
  await app.listen(FastifyConstants.PORT());
}
bootstrap()
