import { Controller, Post } from "@nestjs/common";
import { authService } from "./auth.service";

@Controller('auth')
export class authController {
    constructor(private authService: authService) { };

    @Post('signup')
    signup() {
        return 'your signed up'
    }

    @Post('signin')
    signin() {
        return 'your signed in'
    }
};