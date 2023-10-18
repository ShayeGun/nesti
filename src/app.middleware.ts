import { Injectable, NestMiddleware, Inject } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { REDIS_CLIENT } from './redis/constants';
import { Redis } from "ioredis";

@Injectable()
export class CacheMiddleware implements NestMiddleware {
    constructor(
        @Inject(REDIS_CLIENT) private readonly cache: Redis
    ) { }
    async use(req: Request, res: Response, next: NextFunction) {
        console.log('cache middleware ...');
        const result = await this.cache.get('hello');
        if (result) {
            return res.status(200).send(result);
        }
        next();
    }
}

@Injectable()
export class LoggerMiddleware2 implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('middleware 2 ...');
        next();
    }
}