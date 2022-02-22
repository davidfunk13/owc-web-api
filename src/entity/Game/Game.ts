import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import Role from "../../types/Role";
import { Min, Max, IsNotEmpty, IsNumber } from "class-validator";
import { Session } from "../Session/Session";
import GameType from "../../types/GameTypes";
import GameOutcome from "../../types/GameOutcome";


@Entity()
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    role: Role

    @Column()
    @IsNotEmpty()
    @Min(1)
    @Max(19)
    matchLocationId: number

    @Column()
    @IsNotEmpty()
    @Min(0)
    @Max(3)
    gameTypeId: GameType

    @Column()
    @IsNotEmpty()
    @IsNumber()
    heroId: number

    @Column()
    @IsNotEmpty()
    @Min(0)
    @Max(2)
    matchOutcome: GameOutcome

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(500)
    @Max(5000)
    skillRatingIn: number

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(500)
    @Max(5000)
    skillRatingOut: number

    //non-required fields
    //Additional Heroes Played
    @Column()
    @IsNumber()
    heroId2: number

    @Column()
    @IsNumber()
    heroId3: number

    //If control map, Have these for where the rounds take place and  what the outcome was.
    @Column()
    roundOneLocation: string

    @Column()
    @Min(0)
    @Max(2)
    roundOneOutcome: GameOutcome

    @Column()
    roundTwoLocation: string
    @Column()
    @Min(0)
    @Max(2)
    roundTwoOutcome: GameOutcome

    @Column()
    roundThreeLocation: string
    @Column()
    @Min(0)
    @Max(2)
    roundThreeOutcome: GameOutcome

    //Relation to session
    @ManyToOne(() => Session, session => session.games, { onDelete: "CASCADE" })
    session: Session
}