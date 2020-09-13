import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, BaseEntity} from "typeorm";
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

    @Column('uuid')         
    createbyId!: string;

    @Column('uuid')         
    organizationId?: string;

    @Column('uuid')
    contactId!:string

    @ManyToOne(() => Organization, org => org.technology)
    @JoinColumn({name: 'organizationId'})
    organization?: Organization;

    @ManyToOne(() => User, u => u.technologys)
    @JoinColumn({name: 'createbyId'})
    creatby!: User

    @ManyToOne(() => Contact)
    @JoinColumn({name: 'contactId'})
    contact!: Contact;

}
