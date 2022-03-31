import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, BeforeInsert, BeforeUpdate } from "typeorm";
import Role from "../../types/Role";
import { Min, Max, IsNotEmpty, IsNumber, validateOrReject } from "class-validator";
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
    @IsNumber()
    heroId2: number | undefined | null

    @Column({ nullable: true })
    @IsNumber()
    heroId3: number | null

    @Column({ nullable: true })
    roundOneLocation: string

    @Column({ nullable: true })
    @Min(0)
    @Max(1)
    @IsNumber()
    roundOneOutcome: number | null

    @Column({ nullable: true })
    roundTwoLocation: string

    @Column({ nullable: true })
    @Min(0)
    @Max(1)
    @IsNumber()
    roundTwoOutcome: number | null

    @Column({ nullable: true })
    roundThreeLocation: string
    
    @Column({ nullable: true,  })
    @Min(0)
    @Max(1)
    @IsNumber()
    roundThreeOutcome: number | null

    //Relation to session
    @ManyToOne(() => Session, session => session.games, { onDelete: "CASCADE" })
    session: Session

    @BeforeInsert()
    @BeforeUpdate()
    async validate() { 
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