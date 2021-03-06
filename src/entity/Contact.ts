import {Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity, JoinColumn} from "typeorm";
import _ from 'lodash';
import { PersonTitle } from "./util";
import { User } from "./User";


@Entity()
export class Contact extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column({
        type: "enum",
        enum: PersonTitle,
        default: PersonTitle.Blank
        })
    title?: string;

    @Column('uuid')
    createbyId!:string;

    @Column({type: 'varchar', default: ''})
    first_name!: string;

    @Column('varchar')
    last_name!: string;

    @Column('varchar')
    job_title!: string;

    @Column('varchar')
    email!: string;

    @Column('varchar')
    country!: string;

    @Column('varchar')
    state!: string;

    @ManyToOne(() => User, u => u.contact)
    @JoinColumn({ name: 'createbyId' })
    createby!: User;

    toJSON(){
        var tmp = _.omit(this, ['person'])
        return _.pickBy(tmp, v => (v !== undefined && typeof v!== "function"))
    }

}
