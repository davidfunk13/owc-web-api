import { Contains, IsBoolean, IsInt, IsNotEmpty, IsString, validateOrReject } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import { Platform } from "../../types/Platform";
import { Session } from "../Session/Session";

@Entity()
export class Battletag {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  urlName: string;

  @Column()
  @IsNotEmpty()
  @IsInt()
  level: number;

  @Column()
  @IsNotEmpty()
  @IsInt()
  playerLevel: number;

  @Column()
  @IsBoolean()
  @IsNotEmpty()
  isPublic: boolean;

  @Column()
  @IsNotEmpty()
  @IsString()
  platform: Platform;
  
  @Column()
  @IsNotEmpty()
  @IsString()
  portrait: string;

  @OneToMany(() => Session, session => session.battletag, { onDelete: "CASCADE" })
  sessions: Session[]

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this);
  }

}
