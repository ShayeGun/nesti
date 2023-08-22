import { BadRequestException, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schema/user.schema';
// import { User } from './user.entity';
import { CreateUserDto } from './Dtos/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        // @InjectRepository(User)
        // private usersRepository: Repository<User>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    addOne(data: CreateUserDto): Promise<User> {
        // const newUser = this.userModel.create(data);
        // return this.userModel.save(newUser);
        const newUser = new this.userModel(data);
        return newUser.save();
    }

    findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    findOne(email: string): Promise<User | null> {
        // return this.userModel.findOneBy({ email });
        return this.userModel.findOne({ email }).exec();
    }

    async updateOne(query: Record<string, any>, attrs: Partial<User>) {
        // const user = await this.userModel.findOneBy({ id });
        const user = await this.userModel.findOneAndUpdate(query, attrs).exec();
        if (!user) throw new BadRequestException();
        // Object.assign(user, attrs);
        // return this.userModel.save(user);
        return user.save();
    }

    async remove(id: number): Promise<void> {
        // const user = await this.userModel.findOneBy({ id });
        // if (!user) throw new BadRequestException();
        // await this.userModel.remove(user);
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if (!user) throw new BadRequestException();
        return;
    }
}