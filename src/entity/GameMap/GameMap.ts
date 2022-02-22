import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { IsNotEmpty, Max, Min } from "class-validator";
import GameType from "../../types/GameTypes";

@Entity()
export class GameMap extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    name: string
    
    @Column()
    @IsNotEmpty()
    gameType: string

    @Column()
    @IsNotEmpty()
    @Min(0)
    @Max(3)
    gameTypeId: GameType
    
    @Column({nullable: true})
    subMap1: string
    @Column({nullable: true})
    subMap2: string
    @Column({nullable: true})
    subMap3: string
}