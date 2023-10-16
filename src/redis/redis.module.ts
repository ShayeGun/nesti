import { DynamicModule, Module, Provider } from '@nestjs/common';
import { Redis } from 'ioredis';
import { REDIS_CLIENT } from './constants';

interface OptionInterface {
  port: number, // Redis port
  host: string, // Redis host
  username: string, // needs Redis >= 6
  password: string,
  db: number, // Defaults to 0
}

@Module({})
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
}
