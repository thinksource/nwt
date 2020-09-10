import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, BaseEntity} from "typeorm";
import { Organization } from "./Organization";
import { Contact } from "./Contact";
import { User } from "./User";

@Entity()
export class Technology extends BaseEntity{
    
    @PrimaryGeneratedColumn('uuid')
    id!: string;
    
    @Column('varchar')
    name!: string;

    @Column("varchar",{length: 1000})
    brief?: string;

    @Column('varchar')
    link?: string;

    @Column('tinyint')
    COVID_19!: boolean;

    @ManyToOne(() => Organization, org => org.technology)
    organization!: Organization;

    @ManyToOne(() => User, u => u.technologys)
    creatby!: User

    @OneToOne(() => Contact)
    @JoinColumn()
    contact!: Contact;

}
