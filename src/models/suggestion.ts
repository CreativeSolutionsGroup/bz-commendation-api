import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import Team from "./team";
import User from "./user";

@Entity()
class Suggestion {
    @PrimaryColumn()
    id: string;
    @Column()
    date: string;
    @Column()
    message: string;
    @OneToOne(() => User, user => user.id)
    fromUser: string;
    @OneToOne(() => Team, team => team.id)
    toTeam: string;
}

export default Suggestion;