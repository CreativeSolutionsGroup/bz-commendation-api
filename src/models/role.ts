import { Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, user => user.role)
  users: Array<User>;

  @Column()
  role: string
}