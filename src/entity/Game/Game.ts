import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, OneToMany, JoinColumn } from "typeorm";
import Role from "../../types/Role";
import { Battletag } from "../Battletag/Battletag";
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty } from "class-validator";

@Entity()
export class Game extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

   @Column()
   @IsNotEmpty()
   @Min(500)
   @Max(5000)
   outcome: number

    @ManyToOne(() => Battletag, battletag => battletag.sessions, { onDelete: "CASCADE" })
    battletag: Battletag
}