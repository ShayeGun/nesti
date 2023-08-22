import { Body, Injectable, HttpException, HttpStatus, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/user/user.service";
import { CreateUserDto } from "src/user/Dtos/create-user.dto";
import { compare } from "bcrypt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService,
        private readonly jwtService: JwtService, private readonly configService: ConfigService) { };

    async signup(@Body() body: CreateUserDto) {
        const existedUser = await this.userService.findOne(body.email);

        if (existedUser) throw new HttpException('email already exist', HttpStatus.FORBIDDEN);

        const newUser = await this.userService.addOne(body);

        const accessToken = await this.jwtService.signAsync({ ...newUser }, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
        });

        return {
            user: newUser,
            accessToken
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