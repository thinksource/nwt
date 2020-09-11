import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import { Organization } from "./Organization";
import { Contact } from "./Contact";
import { User } from "./User";

@Entity()
export class Project extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @Column("varchar")
    name!: string;

    @Column("varchar",{length: 1000})
    brief?: string;

    @Column("simple-array")
    expertise?: string[];

    @Column('tinyint')
    COVID_19!: boolean;

    @OneToOne(() => Contact)
    @JoinColumn()
    contact!: Contact;

    @ManyToOne(() => Organization, org => org.project, {nullable: true})
    organization?: Organization;

    @Column('date')
    start!: Date;

    @Column('date')
    end!: Date;

    @ManyToOne(() => User, u => u.projects)
    creatby!: User


    // @Column('createby')
    // createby: User

    constructor(){
        const today = new Date()
        super()
        this.name=''
        this.brief=''
        this.expertise = []
        this.COVID_19=false
        this.organization
        this.start = today
        this.end = today
    }

}
