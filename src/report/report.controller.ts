import { Body, Controller, Post } from '@nestjs/common';

@Controller('report')
export class ReportController {
    @Post()
    createUser(@Body() body: any) {
        return body
    }
}
