import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { LoggerMiddleware, LoggerMiddleware2 } from './app.middleware';
import { UserController } from './user/user.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './app.filter';
import { ReportService } from './report/report.service';
import { ReportModule } from './report/report.module';
import { Report } from './report/report.entity';
import { CacheModule } from '@nestjs/cache-manager';
import { RedisModule } from './redis/redis.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI')
      }),
      inject: [ConfigService]
    }),
    CacheModule.register({
      isGlobal: true,
      useFactory: async () => ({
        store: redisStore as any,
        host: 'localhost',
        port: 6379,
        // ttl: 10000,
      }),
    }),
    AuthModule,
    UserModule,
    RedisModule.registerAsync(new ConfigService),
    // ReportModule
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    ReportService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(
    //     LoggerMiddleware, LoggerMiddleware2)
    //   .forRoutes(UserController);
  }
}
