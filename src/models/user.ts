import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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
}

export default User;
