import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Team from "./team";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    email: string;

    @Column()
    name: string;

    @OneToMany(() => Team, team => team.id)
    team: number;

    @Column()
    phone: string;

    @Column()
    googleId: string;
}

export default User;