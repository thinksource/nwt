import {Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity} from "typeorm";
import { Person } from "./Person";
import _ from 'lodash';


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

    toJSON(){
        var tmp = _.omit(this, ['person'])
        return _.pickBy(tmp, v => (v !== undefined && typeof v!== "function"))
    }

}
