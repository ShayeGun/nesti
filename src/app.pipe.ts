import { BadRequestException, ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { IsNumberString } from 'class-validator';

export class Dto {
    @IsNumberString()
    id: string;
}

