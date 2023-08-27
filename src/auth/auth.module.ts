import { Module, forwardRef } from "@nestjs/common";
import { authController } from "./auth.controller";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AuthService } from "./auth.service";
import { BaseGuard, RolesGuard } from "./guard/index";
import { UserModule } from "src/user/user.module";

@Module({
    imports: [
        JwtModule.register({}),
        forwardRef(() => UserModule)],
    controllers: [authController],
    providers: [AuthService, BaseGuard, RolesGuard, JwtService],
    exports: [AuthService, BaseGuard, RolesGuard]
})

export class AuthModule { };