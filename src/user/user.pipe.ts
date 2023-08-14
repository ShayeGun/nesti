import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class Pipy implements PipeTransform {
    transform(value: any): any {
        console.log('Pipe');

        return value;
    }
}