import { Module, forwardRef } from "@nestjs/common";
import { authController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { BaseGuard } from "./guard/base.guard";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        JwtModule.register({}),
        forwardRef(() => UserModule)],
    controllers: [authController],
    providers: [AuthService, BaseGuard, JwtService],
    exports: [AuthService, BaseGuard]
})

export class AuthModule { };