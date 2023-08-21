import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BaseGuard } from 'src/auth/guard/base.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UsersService, JwtService, BaseGuard],
  exports: [TypeOrmModule, UsersService]
})
export class UserModule { }
