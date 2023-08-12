import { BadRequestException, ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { validate, IsInt } from 'class-validator';
import { plainToInstance } from "class-transformer";

export class Dto {
    @IsInt()
    id: string;
}

@Injectable()
export class Pipy implements PipeTransform<any> {

    async transform(value: any, { metatype }: ArgumentMetadata) {
        return typeof value;
    }
}
