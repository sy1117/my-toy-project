import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { User } from "./User";

@Entity()
export class Auth extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable:true})
    userId : number

    @Column({type:"text", nullable:true})
    accessToken : string;

    @Column({type:"text", nullable:true})
    refreshToken: string;
}