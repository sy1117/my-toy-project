import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne} from "typeorm";
import { Auth } from "./Auth";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"text", nullable:true})
    googleId : string;

    @Column({type:"text"})
    firstName: string;

    @Column({type:"text"})
    lastName: string;

    @Column({type:"text"})
    picture: string;

}
