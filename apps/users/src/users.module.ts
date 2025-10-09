import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: (() => {
        switch (process.env.NODE_ENV) {
          case 'local':
            return 'apps/users/.env.local';
          case 'development':
            return 'apps/users/.env.development';
          case 'production':
            return 'apps/users/.env.production';
          case 'staging':
            return 'apps/users/.env.staging';
          case 'test':
            return 'apps/users/.env.test';
          default:
            return 'apps/users/.env';
        }
      })(),
      isGlobal: true,
    }),
    // ...outros imports...
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
