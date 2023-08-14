import { Module } from "@nestjs/common";
import { authController } from "./auth.controller";
import { authService } from "./auth.service";
import { BaseGuard } from "./guard/base.guard";

@Module({
    controllers: [authController],
    providers: [authService, BaseGuard],
    exports: [authService, BaseGuard]
})

export class AuthModule { };