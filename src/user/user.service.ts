import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
import { CreateUserDto } from './Dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    addOne(data: CreateUserDto): Promise<User> {
        const newUser = new this.userModel(data);
        return newUser.save();
    }

    findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    findOne(query: Record<string, any>): Promise<User | null> {
        return this.userModel.findOne(query).exec();
    }

    async updateOne(query: Record<string, any>, attrs: Partial<User>) {
        const user = await this.userModel.findOneAndUpdate(query, attrs).exec();

        if (!user) throw new BadRequestException();
        return user.save();
    }

    async remove(id: number): Promise<void> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user) throw new BadRequestException();
        return;
    }
}