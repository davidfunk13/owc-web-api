import { Contains, IsBoolean, IsInt, IsNotEmpty, IsString, validateOrReject } from "class-validator";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BeforeInsert, BeforeUpdate } from "typeorm";
import IPlatform from "../../types/IPlatform";
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
  userId: string
  
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
  isPublic: boolean;

  @Column()
  @IsNotEmpty()
  @IsString()
  platform: IPlatform;
  
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
