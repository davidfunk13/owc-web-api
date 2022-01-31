import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import Role from "../../types/Role";
import { Battletag } from "../Battletag/Battletag";

@Entity()
export class Session extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    tankSrStart: number;
    
    @Column()
    tankSrCurrent: number;
    
    @Column()
    damageSrStart: number;
    
    @Column()
    damageSrCurrent: number;
    
    @Column()
    supportSrStart: number;
    
    @Column()
    supportSrCurrent: number;
    
    @ManyToOne(type => Battletag, battletag => battletag.sessions) battletag: Battletag; 
}