import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class BaseGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        console.log('Guard');

        return true;
    }
}