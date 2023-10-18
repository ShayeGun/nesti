import { Controller, Get, HttpCode, Inject, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { REDIS_CLIENT } from './redis/constants';
import { Redis } from 'ioredis';


@Controller('/person')
// caching only works on GET routes
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('CACHE_MANAGER') private readonly cacheManager: Cache,
    @Inject(REDIS_CLIENT) private readonly redisClient: Redis
  ) { }

  @CacheKey('hello')
  @Get('/hello')
  @HttpCode(200)
  async hello(): Promise<string> {

    console.log('insert into redis');
    await this.redisClient.set("hello", "salam");
    const v = await this.redisClient.get("hello");

    return `${v}`;
  }

  @Get('/bye')
  @HttpCode(200)
  bye(): string {
    return this.appService.getBye();
  }
}