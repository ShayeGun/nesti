import { Controller, HttpCode, Body, Post, Get, UseGuards, UsePipes, Req, UseInterceptors } from '@nestjs/common';
import { UsersService } from './user.service';
import { BaseGuard } from 'src/auth/guard/base.guard';
import { Pipy } from './user.pipe';
import { LoggingInterceptor } from 'src/app.interceptor';

@Controller('user')
@UseGuards(BaseGuard)
export class UserController {
    constructor(private userService: UsersService) { }

    @Post()
    @UsePipes(Pipy)
    @HttpCode(201)
    addOne(@Body() body: any) {
        // return this.userService.addOne(body.firstName, body.lastName);
        return 'sth';
    }

    @Get()
    @UseInterceptors(LoggingInterceptor)
    @HttpCode(200)
    findAll(@Req() req: any) {
        // return this.userService.findAll();
        return { data: 'data res' };
    }
}


