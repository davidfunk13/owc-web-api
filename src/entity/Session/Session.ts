import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Battletag } from "../Battletag/Battletag";
import { Min, Max, IsNotEmpty, validateOrReject } from "class-validator";
import { Game } from "../Game/Game";

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

  @OneToMany(() => Game, game => game.session, { onDelete: "CASCADE" })
  games: Game[]

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }
}