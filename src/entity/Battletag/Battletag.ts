import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Platform } from "../../types/Platform";
import { Session } from "../Session/Session";

@Entity()
export class Battletag {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column()
    name: string;

    @Column()
    urlName: string;

    @Column()
    level: number;

    @Column()
    playerLevel: number;

    @Column()
    isPublic: boolean;

    @Column()
    platform: Platform;

    @Column()
    portrait: string;

    @OneToMany(() => Session, session => session.battletag, { onDelete: "CASCADE" })
    sessions: Session[]
}
