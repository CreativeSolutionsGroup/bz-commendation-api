import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
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
    @ManyToOne(() => User, user => user.id)
    fromUser: string;
    @ManyToOne(() => Team, team => team.id)
    toTeam: string;
}

export default Suggestion;