import { Logger, Controller, Get, HttpCode, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { Dto } from './app.pipe';


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

  @UsePipes(ValidationPipe)
  @Get(':id')
  findOne(@Param() id: Dto) {
    return id;
  }
}