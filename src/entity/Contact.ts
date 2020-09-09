import {Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import { Person } from "./Person";



@Entity()
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    


    @Column('varchar')
    job_title!: string;

    @Column('varchar')
    email!: string;

    @Column('varchar')
    country!: string;

    @Column('varchar')
    state!: string;

    @ManyToOne(() => Person, p => p.contact)
    person!: Person;
}
