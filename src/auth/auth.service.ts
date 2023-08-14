import { Injectable } from "@nestjs/common";

@Injectable()
export class authService {
    signup() {
        return 'your signed up';
    };
    login() {
        return 'your login in';
    };
}