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
import { CustomModule } from './custom-module/custom-module.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  MongooseModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URI')
    }),
    inject: [ConfigService]
  }),
    AuthModule,
    UserModule,
  CustomModule.forRoot({
    imports: [ConfigModule],
    useFactory: async (configService: ConfigService) => ({
      base: configService.get<string>('APP_PORT')
    }),
    inject: [ConfigService]
  }),
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer
    //   .apply(
    //     LoggerMiddleware, LoggerMiddleware2)
    //   .forRoutes(UserController);
  }
}
