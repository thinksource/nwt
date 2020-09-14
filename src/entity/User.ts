import {Entity, PrimaryGeneratedColumn, Column, Index, BeforeInsert, BaseEntity, OneToMany} from "typeorm";
import crypto from 'crypto';
import _ from 'lodash';
import { Project } from "./Project";
import { Technology } from "./Technology";
import { Contact } from "./Contact";
import { flaten } from "../../libs/utils";
// export type UserState = "active" | "deactive"
export enum UserRole {
    admin = "admin",
    active = "active",
    blocked = "blocked"
}  

export const pwhash = (contents: string, salt: string) => crypto.pbkdf2Sync(contents, salt, 1000, 64,'sha512').toString('hex');


@Entity({name: 'user'})
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    @Index()
    email!: string;

    @Column('varchar')
    password!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: 'active'
    })
    role!: UserRole;

    @Column('varchar')
    salt!: string;

    @OneToMany(()=>Project, p=>p.createby)
    projects?: Project


    @OneToMany(()=>Technology, p=>p.createby)
    technologys?: Technology

    @OneToMany(()=>Contact, c=>c.createby)
    contact?:Contact

    errors?: string[];

    // @Column({
    //     type: 'enum',
    //     emun: ["admin", "active", 'deactive'],
    //     default: 'active'
    // })
    // role: UserRole

    generateSalt(){
        this.salt = crypto.randomBytes(16).toString('hex');
    }

    @BeforeInsert()
    generatePasswordDigest(){
        this.generateSalt()
        this.password = pwhash(this.password, this.salt);
    }


    toJSON() {
        const tmp = _.omit(this, ['password', 'errors', 'salt']);
        return flaten(tmp)
    }

}
