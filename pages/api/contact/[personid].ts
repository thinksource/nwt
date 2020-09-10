import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'
import { Contact } from '../../../src/entity/Contact'
import _ from 'lodash';

handler.get(async (req, res)=>{
    try{
    const query =req.query as {personid: string}
    const rep = (await getDatabaseConnection()).getRepository<Contact>('contact')
    // const build = rep.createQueryBuilder().innerJoin("person", "person").where("person.id= :personId", {personId: personId})
    const build = rep.createQueryBuilder('contact').where('personId = :Id', {'Id': query.personid})

    // const result = await rep.createQueryBuilder().relation('person').of(personid).select()
    // const result = await rep.createQueryBuilder().relation('people').of(personid)
                // .where("contact.personId = :id", {id: personid})
    // const result = await rep.find({where: {'person.id': personid}, relations: ["person"]})
    // console.log(build.getSql())
    const result = await build.getMany()
    // for(let i of result){
    //     console.log(i.toJSON())
    //     console.log(_.pickBy(i, t =>( t != undefined && typeof t!== "function")))
    // }
    res.status(200).json(result.map(c=>c.toJSON()))
    }catch(e){
        console.log(e)
        res.status(500).json(e)
    }
})
export default handler
