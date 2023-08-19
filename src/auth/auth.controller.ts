import { Body, ClassSerializerInterceptor, Controller, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { BaseGuard } from "./guard/base.guard";
import { CreateUserDto, LoginUserDto } from "src/user/Dtos/create-user.dto";

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
@UseGuards(BaseGuard)
export class authController {
    constructor(private readonly authService: AuthService) { };

    @Post('signup')
    signup(@Body() body: CreateUserDto) {
        return this.authService.signup(body);
    }

    @Post('login')
    login(@Body() body: LoginUserDto) {
        return this.authService.login(body);
    }
};