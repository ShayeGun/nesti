import { Logger, Controller, Get, HttpCode, Param, ParseIntPipe, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { Dto, Pipy } from './app.pipe';
// import { ValidationPipe } from '@nestjs/common';



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

  @UsePipes(Pipy)
  @Get(':id')
  findOne(@Param('id') id: any) {
    console.log(id);
    return id;
  }
}
