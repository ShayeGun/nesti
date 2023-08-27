import { Body, Injectable, UnauthorizedException, BadRequestException } from "@nestjs/common";
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
        const existedUser = await this.userService.findOne({ email: body.email });

        if (existedUser) throw new BadRequestException('email already exist');

        const newUser = await this.userService.addOne(body);

        const { refreshToken, accessToken } = await this.generateTokens({ email: newUser.email, id: newUser["_id"], role: newUser.role });

        const u = await this.userService.updateOne({ _id: newUser["_id"] }, { refreshToken });

        return {
            user: u,
            accessToken,
            refreshToken
        };
    };

    async login(@Body() body: CreateUserDto) {
        const existedUser = await this.userService.findOne({ email: body.email });

        if (!existedUser) throw new BadRequestException('no such user');

        if (!await compare(body.password, existedUser.password)) throw new UnauthorizedException();

        const { refreshToken, accessToken } = await this.generateTokens({ email: existedUser.email, id: existedUser["_id"], role: existedUser.role });

        const u = await this.userService.updateOne({ _id: existedUser["_id"] }, { refreshToken });

        return {
            user: u,
            accessToken,
            refreshToken
        };
    };

    async refreshAccessToken(token: { accessToken: string, refreshToken: string; }) {
        const data = this.validateRefreshToken(token);
        return data;
    }

    private async generateTokens(payload: Record<string, any>) {
        const accessToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('JWT_SECRET'),
            expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
        });

        const refreshToken = await this.jwtService.signAsync(payload, {
            secret: this.configService.get<string>('REFRESH_SECRET'),
            expiresIn: this.configService.get<string>('REFRESH_EXPIRATION'),
        });

        return { accessToken, refreshToken };
    }

    private async validateRefreshToken(token: { accessToken: string, refreshToken: string; }) {
        const { refreshToken, accessToken } = token;

        const accessPayload = this.getTokenPayload(accessToken);
        const refreshPayload = this.getTokenPayload(refreshToken);
        try {
            // 1) check payloads
            if (accessPayload.id !== refreshPayload.id) throw new UnauthorizedException('not valid refresh token');

            // 2) check refresh token validity <refresh id and access id are the same but refreshToken is invalid>
            await this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>('REFRESH_SECRET')
            });

            // 3) check refresh token validity <refresh token is valid but is not in DB>
            const existedUser = await this.userService.findOne({ refreshToken });

            console.log(existedUser);

            if (!existedUser) await this.userService.updateOne({ _id: refreshPayload.id }, { refreshToken: '' });


            // 4) create a new refresh and access token
            const { accessToken: newAccess, refreshToken: newRefresh } = await this.generateTokens({ email: refreshPayload.email, id: refreshPayload.id });

            existedUser.refreshToken = newRefresh;
            await (existedUser as any).save();

            return {
                user: existedUser,
                accessToken: newAccess,
                refreshToken: newRefresh
            };
        } catch (err) {
            throw new UnauthorizedException(err.message);
        }

    }

    private getTokenPayload(token: string) {
        const tokenPayload: string = token.split('.')[1];

        const tokenFormatted = JSON.parse(Buffer.from(tokenPayload, 'base64').toString('utf-8'));

        return tokenFormatted;
    }
}