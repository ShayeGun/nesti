import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { BaseGuard } from "./guard/base.guard";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
            inject: [ConfigService],
        }), UserModule],
    controllers: [authController],
    providers: [AuthService, BaseGuard],
    exports: [AuthService, BaseGuard]
})

export class AuthModule { };