import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(@Inject('TEST') private readonly t: any) { }
  getHello(): string {
    return 'Hello World!';
  }

  getBye(): string {
    return this.t;
  }
}
