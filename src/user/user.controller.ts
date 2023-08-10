import { Controller, HttpCode, Body, Post, Get } from '@nestjs/common';
import { UsersService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UsersService) { }

    @Post()
    @HttpCode(201)
    addOne(@Body() body: any) {
        return this.userService.addOne(body.firstName, body.lastName);
    }

    @Get()
    @HttpCode(200)
    findAll() {
        return this.userService.findAll();
    }
}


