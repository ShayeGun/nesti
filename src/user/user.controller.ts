import { Controller, HttpCode, Body, Post, Get, UseGuards, Req, UseInterceptors, ValidationPipe, Param, Delete, } from '@nestjs/common';
import { UsersService } from './user.service';
import { BaseGuard, RolesGuard } from 'src/auth/guard/index';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/auth/role.enum';
import { User } from './current-user.decorator';

@Controller('user')
export class UserController {
    constructor(private userService: UsersService) { }

    @Post(':id')
    @HttpCode(201)
    updateOne(@Body() body: any, @Param('id') id: string) {
        return this.userService.updateOne({ id }, body);
    }

    @Delete(':id')
    @HttpCode(201)
    removeOne(@Param('id') id: string) {
        return this.userService.remove(+id);
    }

    @Roles(Role.Admin)
    @UseGuards(BaseGuard, RolesGuard)
    @Get()
    @HttpCode(200)
    findAll(@Req() req: any) {
        return this.userService.findAll();
    }

    @UseGuards(BaseGuard)
    @Get('/current')
    @HttpCode(200)
    showUser(@User() user: any) {
        return user;
    }
}


