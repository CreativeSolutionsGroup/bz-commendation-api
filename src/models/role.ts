import { Column, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => User, user => user.id)
  userId: string;

  @Column()
  role: string
}