import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import { UserModule } from './user/user.module';
import { LoggerMiddleware, LoggerMiddleware2 } from './app.middleware';
import { UserController } from './user/user.controller';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './app.filter';
import { ReportService } from './report/report.service';
import { ReportModule } from './report/report.module';
import { Report } from './report/report.entity';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: '.env',
  }),
  // TypeOrmModule.forRootAsync({
  //   inject: [ConfigService],
  //   useFactory: (configService: ConfigService) => ({
  //     type: 'postgres',
  //     port: configService.get<number>('DATABASE_PORT'),
  //     host: configService.get<string>('DATABASE_URL'),
  //     username: configService.get<string>('DATABASE_USER'),
  //     password: configService.get<string>('DATABASE_PASS'),
  //     entities: [User, Report],
  //     synchronize: true,
  //   })
  // }),
  MongooseModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URI')
    }),
    inject: [ConfigService]
  }),
    AuthModule,
    UserModule,
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
