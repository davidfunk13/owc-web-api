import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import Role from "../../types/Role";
import { Min, Max, IsNotEmpty, IsNumber, validateOrReject, IsNumberString, IsOptional } from "class-validator";
import { Session } from "../Session/Session";
import GameOutcome from "../../types/GameOutcome";
import { isNull } from "util";


@Entity()
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @Max(2)
    role: Role

    @Column()
    @IsNotEmpty()
    @Min(1)
    @Max(19)
    matchLocationId: number

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

    @Column({ nullable: true })
    @IsOptional()
    @IsNumber()
    heroId2: number | null

    @Column({ nullable: true })
    @IsNumber()
    @IsOptional()
    heroId3: number | null

    @Column({ nullable: true })
    roundOneLocation: string | null

    @Column({ nullable: true })
    @Min(0)
    @Max(1)
    @IsNumber()
    @IsOptional()
    roundOneOutcome: number | null

    @Column({ nullable: true })
    roundTwoLocation: string | null

    @Column({ nullable: true })
    @Min(0)
    @Max(1)
    @IsNumber()
    @IsOptional()
    roundTwoOutcome: number | null

    @Column({ nullable: true })
    roundThreeLocation: string | null

    @Column({ nullable: true, })
    @Min(0)
    @Max(1)
    @IsNumber()
    @IsOptional()
    roundThreeOutcome: number | null

    @ManyToOne(() => Session, session => session.games, { onDelete: "CASCADE" })
    session: Session

    @BeforeInsert()
    @BeforeUpdate()
    async validate() {
        this.matchLocationId = +this.matchLocationId
        this.heroId = +this.heroId
        this.matchOutcome = +this.matchOutcome
        this.skillRatingIn = +this.skillRatingIn
        this.skillRatingOut = +this.skillRatingOut
        this.role = +this.role
        this.heroId2 = +this.heroId2
        this.heroId3 = +this.heroId3
        this.roundOneOutcome = +this.roundOneOutcome
        this.roundTwoOutcome = +this.roundTwoOutcome
        this.roundThreeOutcome = +this.roundThreeOutcome

 
        if (!this.heroId2 && !isNull(this.heroId2)) {
            this.heroId2 = null;
        }

        if (!this.heroId3 && !isNull(this.heroId3)) {
            this.heroId3 = null;
        }

        if (!this.roundOneOutcome && !isNull(this.roundOneOutcome)) {
            this.roundOneOutcome = null;
        }

        if (!this.roundOneLocation && !isNull(this.roundOneLocation)) {
            this.roundOneLocation = null;
        }

        if (!this.roundTwoOutcome && !isNull(this.roundTwoOutcome)) {
            this.roundTwoOutcome = null;
        }

        if (!this.roundTwoLocation && !isNull(this.roundTwoLocation)) {
            this.roundTwoLocation = null;
        }

        if (!this.roundThreeOutcome && !isNull(this.roundThreeOutcome)) {
            this.roundThreeOutcome = null;
        }

        if (!this.roundThreeLocation && !isNull(this.roundThreeLocation)) {
            this.roundThreeLocation = null;
        }

        await validateOrReject(this);
    }

}