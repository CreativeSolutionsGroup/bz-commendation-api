import { Column, PrimaryGeneratedColumn } from "typeorm";

class Team {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  logo: string;
}

export default Team;