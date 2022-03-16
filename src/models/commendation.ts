import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm";

@Entity()
class Commendation {
  @PrimaryColumn()
  _id: string;
  @Column()
  date: string;
  @Column()
  message: string;
  @Column()
  fromEmail: string;
  @Column()
  toEmail: string;
  @Column()
  otherEmails: string[];
  @Column()
  phone: string;
}

export default Commendation;