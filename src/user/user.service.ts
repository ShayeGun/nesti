import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    addOne(email: string, password: string): Promise<User> {
        const newUser = this.usersRepository.create({
            email,
            password
        });
        return this.usersRepository.save(newUser);
    }

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User | null> {
        return this.usersRepository.findOneBy({ id });
    }

    async updateOne(id: number, attrs: Partial<User>) {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new BadRequestException();
        Object.assign(user, attrs);
        return this.usersRepository.save(user);
    }

    async remove(id: number): Promise<void> {
        const user = await this.usersRepository.findOneBy({ id });
        if (!user) throw new BadRequestException();
        await this.usersRepository.remove(user);
    }
}