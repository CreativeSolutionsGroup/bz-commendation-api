import { PrimaryGeneratedColumn, Column, Entity, OneToOne, ManyToOne } from 'typeorm';
import Team from './team';

@Entity({name: "emailList"})
export default class EmailList {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Team, team => team.emailList)
  team: Team;

  @Column()
  email: string;
}