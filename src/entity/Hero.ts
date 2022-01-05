import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import Role from "../types/Role";

@Entity()
export class Hero extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    role: Role;
}