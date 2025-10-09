import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from './users.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(UsersModule);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT') ?? 3002);
}
void bootstrap();
