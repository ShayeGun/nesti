import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UsersService } from './user.service';
// import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { BaseGuard } from 'src/auth/guard/base.guard';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema, User } from './schema/user.schema';
import { genSalt, hash } from 'bcrypt';

@Module({
  imports: [
    // TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;

          schema.pre('save', async function () {
            if (this.isModified('password')) {
              const salt = await genSalt(8);
              const hashedPass = await hash(this.password, salt);
              this.password = hashedPass;
            }
          });

          return schema;
        },
      },
    ]),
    forwardRef(() => AuthModule)
  ],
  controllers: [UserController],
  providers: [UsersService, JwtService, BaseGuard],
  exports: [
    // TypeOrmModule,
    UsersService
  ]
})
export class UserModule { }
