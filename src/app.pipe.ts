import { IsNumberString } from 'class-validator';

export class Dto {
    @IsNumberString()
    id: string;
}

