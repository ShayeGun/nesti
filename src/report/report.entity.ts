import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    price: number;
}