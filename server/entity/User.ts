import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToOne} from "typeorm";
import { Auth } from "./Auth";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({type:"int"})
    googleId : number;

    @Column({type:"text"})
    firstName: string;

    @Column({type:"text"})
    lastName: string;

    @Column({type:"text"})
    picture: string;

}
