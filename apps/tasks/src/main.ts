import { NestFactory } from '@nestjs/core';
import { TasksModule } from './tasks.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(TasksModule);
  await app.listen(process.env.port ?? 3003);
}
void bootstrap();
