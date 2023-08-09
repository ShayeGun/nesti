import { Controller, Get, HttpCode, Header, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/person')
export class AppController {
  constructor(private readonly appService: AppService) { }


  @Get('/hello')
  @HttpCode(200)
  hello(): string {
    return this.appService.getHello();
  }

  @Get('/bye')
  @HttpCode(200)
  bye(): string {
    return this.appService.getBye();
  }
}
