import { Entity, Column, PrimaryGeneratedColumn, Index, BeforeInsert } from 'typeorm';
import { Exclude } from 'class-transformer';
import { genSalt, hash } from 'bcrypt';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    @Exclude()
    password: string;

    @BeforeInsert()
    async updateDates() {
        const salt = await genSalt(8);
        const hashedPass = await hash(this.password, salt);
        this.password = hashedPass;
    }
}