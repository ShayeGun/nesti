import { Controller, HttpCode, Body, Post, Get, UseGuards, UsePipes, Req, UseInterceptors, ValidationPipe, Param, Delete, ClassSerializerInterceptor } from '@nestjs/common';
import { UsersService } from './user.service';
import { BaseGuard } from 'src/auth/guard/base.guard';
import { CreateUserDto } from './Dtos/create-user.dto';

import { User } from './user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
@UseGuards(BaseGuard)
export class UserController {
    constructor(private userService: UsersService) { }

    @Post()
    @UsePipes(new ValidationPipe({ whitelist: true }))
    @HttpCode(201)
    addOne(@Body() body: CreateUserDto) {
        return this.userService.addOne(body.email, body.password);
    }

    @Post(':id')
    @UsePipes(new ValidationPipe({ whitelist: true }))
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


