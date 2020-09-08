import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Person } from "./Person";



@Entity()
export class Contact {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    


    @Column('varchar')
    job_title!: string;

    @Column('varchar')
    email!: string;

    @Column('tinyint')
    member!: boolean;

    @Column('varchar')
    country!: string;

    @Column('varchar')
    state!: string;

    @ManyToOne(() => Person, p => p.contact)
    person!: Person;
}
