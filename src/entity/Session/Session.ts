import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Battletag } from "../Battletag/Battletag";
import { Min, Max, IsNotEmpty, validateOrReject, IsNumber } from "class-validator";
import { Game } from "../Game/Game";

@Entity()
export class Session extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(500)
  @Max(5000)
  tankSrStart: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(500)
  @Max(5000)
  tankSrCurrent: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(500)
  @Max(5000)
  damageSrStart: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(500)
  @Max(5000)
  damageSrCurrent: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(500)
  @Max(5000)
  supportSrStart: number

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Min(500)
  @Max(5000)
  supportSrCurrent: number

  @ManyToOne(() => Battletag, battletag => battletag.sessions, { onDelete: "CASCADE" })
  battletag: Battletag

  @OneToMany(() => Game, game => game.session, { onDelete: "CASCADE" })
  games: Game[]

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    this.tankSrStart = +this.tankSrStart;
    this.tankSrCurrent = +this.tankSrCurrent;
    this.damageSrStart = +this.damageSrStart;
    this.damageSrCurrent = +this.damageSrCurrent;
    this.supportSrStart = +this.supportSrStart;
    this.supportSrCurrent = +this.supportSrCurrent; 
    
    await validateOrReject(this);
  }
}