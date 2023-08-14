import { Controller, Post, UseGuards } from "@nestjs/common";
import { authService } from "./auth.service";
import { BaseGuard } from "./guard/base.guard";

@Controller('auth')
@UseGuards(BaseGuard)
export class authController {
    constructor(private authService: authService) { };

    @Post('signup')
    signup() {
        return this.authService.signup();
    }

    @Post('signin')
    login() {
        return this.authService.login();
    }
};