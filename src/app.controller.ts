import { Controller, Get, HttpCode, Inject, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
import { CacheInterceptor, CACHE_MANAGER, CacheKey, CacheTTL } from '@nestjs/cache-manager';

@UseInterceptors(CacheInterceptor)
@Controller('/person')
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache
  ) { }


  @Get('/hello')
  @HttpCode(200)
  hello(): string {
    return this.appService.getHello();
  }

  @UseInterceptors(CacheInterceptor)
  // @CacheKey('ellie')
  // @CacheTTL(30)
  @Get('/bye')
  @HttpCode(200)
  async bye(): Promise<string> {
    await this.cacheManager.set("batman", "robin", 30);
    return 'bye';
  }

  @Get('/cache')
  async getCache() {
    await this.cacheManager.set("keyT", "valueT", 100);
    // await this.cacheManager.del('ketT');
    // await this.cacheManager.reset();
    const c = await this.cacheManager.get("keyT");
    console.log(c);
    return c;
  }
}