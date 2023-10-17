import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Redis } from 'ioredis';
import { createClient } from 'redis';
import { REDIS_CLIENT } from './constants';
import { ConfigService, ConfigModule } from '@nestjs/config';

interface OptionInterface {
  port: number, // Redis port
  host: string, // Redis host
  username: string, // needs Redis >= 6
  password: string,
  db: number, // Defaults to 0
}

@Module({
  imports: [ConfigModule]
})
export class RedisModule {
  static register(otp: Partial<OptionInterface> = { port: 6379, host: "127.0.0.1" }): DynamicModule {
    const redis = new Redis(otp);

    const RedisProvider: Provider = {
      provide: REDIS_CLIENT,
      useValue: redis
    };

    return {
      module: RedisModule,
      providers: [RedisProvider],
      exports: [RedisProvider],
      global: true
    };
  }

  static registerAsync(configService?: ConfigService): DynamicModule {

    const RedisProviderAsync: Provider = {
      provide: REDIS_CLIENT,
      useFactory: async () => {
        if (!configService) {
          const client = await createClient().connect();
          return client;
        }
        const client = await createClient({
          url: `redis://${configService.get<string>('REDIS_URL')}:${configService.get<string>('REDIS_PORT')}`
        }).connect();
        return client;
      },
      inject: configService ? [ConfigService] : []
    };

    return {
      module: RedisModule,
      providers: [RedisProviderAsync],
      exports: [RedisProviderAsync]
    };
  }
}
