import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { Platform } from "../../types/Platform";

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
}
