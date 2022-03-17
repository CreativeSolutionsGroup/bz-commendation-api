import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import User from "./user";

@Entity()
export default class Commendation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  dateSent: string;

  @OneToOne(() => User, user => user.id)
  fromUser: string;

  @OneToOne(() => User, user => user.id)
  toUser: string;

  @Column()
  message: string;
}

export class SentCommendation extends Commendation {
  date: string;
  otherEmails: string[];
  phone: string;
}