import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';
@Entity({name: "role"})
export default class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => User, user => user.role)
  users: Array<User>;

  @Column()
  role: string
}