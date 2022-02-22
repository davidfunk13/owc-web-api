import { IsNotEmpty, IsString } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import Role from "../../types/Role";

@Entity()
export class Hero extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;
    
    @Column()
    @IsString()
    @IsNotEmpty()
    urlName: string

    @Column()
    @IsNotEmpty()
    role: Role;
}