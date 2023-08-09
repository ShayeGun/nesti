import { Controller, HttpCode, Body, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
    @Post()
    @HttpCode(200)
    print(@Body() body: any) {
        return body
    }
}

