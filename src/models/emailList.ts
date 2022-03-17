import { PrimaryGeneratedColumn, Column, Entity, OneToOne, ManyToOne } from 'typeorm';
import Team from './team';

@Entity()
export default class EmailList {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Team, team => team.id)
  teamId: string;

  @Column()
  email: string;
}