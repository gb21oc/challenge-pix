import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';

import { FastifyConstants } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  await app.listen(FastifyConstants.PORT());
}
bootstrap()
