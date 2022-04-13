import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import EmailList from "./emailList";
import User from "./user";

@Entity({ name: "team"})
class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;

  @OneToMany(() => EmailList, emailList => emailList.team)
  emailList: Array<EmailList>;

  @OneToMany(() => User, user => user.team)
  users: Array<User>;
}

export default Team;