import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { LoggerMiddleware, LoggerMiddleware2 } from './logger.middleware';
import { UserController } from './user/user.controller';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      type: 'postgres',
      port: configService.get<number>('DATABASE_PORT'),
      host: configService.get<string>('DATABASE_URL'),
      username: configService.get<string>('DATABASE_USER'),
      password: configService.get<string>('DATABASE_PASS'),
      entities: [User],
      synchronize: true,
    })
  }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        LoggerMiddleware, LoggerMiddleware2)
      .forRoutes(UserController);
  }
}
