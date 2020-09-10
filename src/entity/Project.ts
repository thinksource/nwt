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
    clinical_expertise?: string[];

    @Column('tinyint')
    COVID_19!: boolean;

    @OneToOne(() => Contact)
    @JoinColumn()
    contact!: Contact;

    @ManyToOne(() => Organization, org => org.project)
    organization!: Organization;

    @Column('date')
    start!: Date;

    @Column('date')
    end!: Date;

    @ManyToOne(() => User, u => u.projects)
    creatby!: User


    // @Column('createby')
    // createby: User

}
