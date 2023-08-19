import { Body, Injectable, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/user/user.service";
import { CreateUserDto } from "src/user/Dtos/create-user.dto";
import { compare } from "bcrypt";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService) { };

    async signup(@Body() body: CreateUserDto) {
        const existedUser = await this.userService.findOne(body.email);

        if (existedUser) throw new HttpException('email already exist', HttpStatus.FORBIDDEN);

        const newUser = await this.userService.addOne(body);

        delete newUser.password;

        const jwt = await this.jwtService.signAsync({ ...newUser });

        return {
            user: newUser,
            accessToken: jwt
        };
    };

    async login(@Body() body: CreateUserDto) {
        const existedUser = await this.userService.findOne(body.email);

        if (!existedUser) throw new HttpException('no such user', HttpStatus.FORBIDDEN);

        if (!await compare(body.password, existedUser.password)) throw new UnauthorizedException();

        const jwt = await this.jwtService.signAsync({ ...existedUser });

        return {
            user: existedUser,
            accessToken: jwt
        };
    };

    generateAccessToken(payload: Record<string, any>, secret: string) { }
}