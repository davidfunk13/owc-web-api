import { IsNotEmpty } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Platform } from "../../types/Platform";
import { Session } from "../Session/Session";

@Entity()
export class Battletag {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNotEmpty()
    urlName: string;

    @Column()
    @IsNotEmpty()
    level: number;

    @Column()
    @IsNotEmpty()
    playerLevel: number;

    @Column()
    @IsNotEmpty()
    isPublic: boolean;

    @Column()
    @IsNotEmpty()
    platform: Platform;

    @Column()
    @IsNotEmpty()
    portrait: string;

    @OneToMany(() => Session, session => session.battletag, { onDelete: "CASCADE" })
    sessions: Session[]
}
