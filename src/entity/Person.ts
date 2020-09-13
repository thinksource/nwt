import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany, BaseEntity} from "typeorm";
import { User } from "./User";
import {Contact} from "./Contact";
import { Organization } from "./Organization";
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { PersonTitle } from "./util";



@Entity({name: 'person'})
export class Person extends BaseEntity {
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

    @Column({type: 'varchar', default: ''})
    first_name!: string;

    @Column('uuid')
    belongOrganizationId!: string;

    @Column('varchar')
    last_name!: string;

    @ManyToOne(() => Organization, org => org.people, { nullable: true
        // , eager: true
    })
    @JoinColumn({ name: 'belongOrganizationId' })
    belong_organization!: Organization;

    @Column("simple-array")
    expertise?: string[];

    @Column({type:"text", default: ''})
    introduction!:string

    @Column({type: "boolean", default: false})
    COVID_19!: boolean;

    @OneToMany(() => Contact, contact => contact.person)
    contact?: Contact[];

    toJSON(inject: Object) {
        var tmp = _.omit(this, ['contact']);
        var res = _.pickBy(tmp, v => (v !== undefined && typeof v!== "function"))
        return JSON.parse(JSON.stringify(Object.assign(res, inject)))
    }



    generation(userstr:string){
        this.id= uuidv4()
        this.COVID_19 = false
        const user = new User()
        user.id=userstr
        this.contact = []
        this.first_name = ""
        this.last_name = ""
        this.title = ""
        this.user = user
        this.expertise = []
        console.log("here is:")
        console.log(this)
        return this
    }
}
