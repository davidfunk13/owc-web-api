import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToOne, OneToMany, JoinColumn } from "typeorm";
import Role from "../../types/Role";
import { Battletag } from "../Battletag/Battletag";
import { Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max, IsNotEmpty } from "class-validator";

@Entity()
export class Session extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @Min(500)
    @Max(5000)
    tankSrStart: number

    @Column()
    @IsNotEmpty()
    @Min(500)
    @Max(5000)
    tankSrCurrent: number

    @Column()
    @IsNotEmpty()
    @Min(500)
    @Max(5000)
    damageSrStart: number

    @Column()
    @IsNotEmpty()
    @Min(500)
    @Max(5000)
    damageSrCurrent: number

    @Column()
    @IsNotEmpty()
    @Min(500)
    @Max(5000)
    supportSrStart: number

    @Column()
    @IsNotEmpty()
    @Min(500)
    @Max(5000)
    supportSrCurrent: number

    @ManyToOne(() => Battletag, battletag => battletag.sessions, { onDelete: "CASCADE" })
    battletag: Battletag
}