import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): any {
        console.log('Before...');

        const request = context.switchToHttp().getRequest();

        console.log(request.hostname);



        const now = Date.now();
        return next
            .handle()
            .pipe(
                map((data) => {
                    console.log('After...');
                    data.data += '1111';
                    return data;
                })
            );
    }
}