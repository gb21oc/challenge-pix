import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import { FastifyConstants } from './common/constants/fastify.constants';
import { FastifyAdapter } from '@nestjs/platform-fastify';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  await app.listen(FastifyConstants.PORT());
}
bootstrap()
