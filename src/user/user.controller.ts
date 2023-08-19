import { Controller, HttpCode, Body, Post, Get, UseGuards, Req, UseInterceptors, ValidationPipe, Param, Delete, } from '@nestjs/common';
import { UsersService } from './user.service';
import { BaseGuard } from 'src/auth/guard/base.guard';

import { User } from './user.entity';

@Controller('user')
@UseGuards(BaseGuard)
export class UserController {
    constructor(private userService: UsersService) { }

    @Post(':id')
    @HttpCode(201)
    updateOne(@Body() body: User, @Param('id') id: string) {
        return this.userService.updateOne(+id, body);
    }

    @Delete(':id')
    @HttpCode(201)
    removeOne(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Get()
    @UseInterceptors(ValidationPipe)
    @HttpCode(200)
    findAll(@Req() req: any) {
        return this.userService.findAll();
    }
}


