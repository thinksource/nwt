import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, BeforeInsert, BaseEntity} from "typeorm";
import { User } from "./User";
import { Person } from "./Person";
import { Project } from "./Project";
import { Technology } from "./Technology";
import _ from 'lodash';
@Entity({name: 'organization'})
export class Organization extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column('varchar')
    name!: string;

    @Column('text')
    brief?: string;

    @Column({
        type: "enum",
        enum: ["active", "inactive", "deleted"],
        default: 'active'
    })
    status!: string;

    @Column('varchar')
    website!: string;

    @Column('simple-array')
    mailext!: string[];

    @OneToMany(() => Person, p => p.belong_organization)
    people?: Person[];

    @OneToMany(() => Project, p => p.organization)
    project?: Project[];

    @OneToMany(() => Technology, t => t.organization)
    technology?: Technology[];

    @ManyToOne(()=>User)
    createby!: User;

    @Column({type:'tinyint', default: false})
    member!: boolean;

    toJSON() {
        const tmp=_.omit(this, ['people', 'project', 'technology', 'createby']);
        const t= _.pickBy(tmp, v => (v !== undefined && typeof v != 'function'))
        return t
    }

    @BeforeInsert()
    fillData(){
        this.project = []
        this.technology = []
        this.project = []
    }

    generate(){
        this.name = ""
        this.mailext=[]
        this.website=""
        this.status = "incative"
        this.brief=""
        return this
    }

    toSimpleJSON(){
        return _.pick(this, ['id', 'name', 'website'])
    }

}
