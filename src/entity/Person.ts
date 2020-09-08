import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import { User } from "./User";
import {Contact} from "./Contact";
import { Organization } from "./Organization";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
export enum PersonTitle {
    Mr = "Mr.",
    Miss = "Miss",
    Dr = "Dr.",
    Mrs ="Mrs.",
    Ms = "Ms.",
    Blank = ""
}

@Entity({name: 'person'})
export class Person {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @OneToOne( () => User)
    @JoinColumn()
    user!: User;

    @Column({
        type: "enum",
        enum: PersonTitle,
        default: PersonTitle.Blank
        })
    title?: string;

    @Column('varchar')
    first_name!: string;

    @Column('varchar')
    last_name!: string;

    @ManyToOne(() => Organization, org => org.people)
    belong_organization!: Organization;

    @Column("simple-array")
    expertise?: string[];

    @Column("boolean")
    COVID_19!: boolean;

    @OneToMany(() => Contact, contact => contact.person)
    contact?: Contact[];

    toJSON() {
        return _.omit(this, ['contact', 'user']);
    }

    generationId(){
        this.id= uuidv4()
        return this.id
    }
}
