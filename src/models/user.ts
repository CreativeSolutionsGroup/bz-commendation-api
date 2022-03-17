import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Commendation from "./commendation";
import Role from "./role";
import Team from "./team";

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  googleId: string;

  @ManyToOne(() => Team)
  team: Team;

  @ManyToOne(() => Role)
  role: Role;

  @OneToMany(() => Commendation, comm => comm.toUser)
  receivedCommendations: Commendation;

  @OneToMany(() => Commendation, comm => comm.fromUser)
  sentCommendations: Commendation;
}

export default User;
