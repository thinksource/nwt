import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'
import { Contact } from '../../../src/entity/Contact'
import {stringify} from 'flatted';

handler.get(async (req, res)=>{
    try{
    const personId=req.query.id?req.query.personid:""
    console.log(personId)
    const rep = (await getDatabaseConnection()).getRepository<Contact>('contact')
    // const build = rep.createQueryBuilder().innerJoin("person", "person").where("person.id= :personId", {personId: personId})
    const build = rep.createQueryBuilder('contact').where('personId = :p', {p: personId})
    // build.setParameter('personId', personId)
    // const result = await rep.createQueryBuilder().relation('person').of(personid).select()
    // const result = await rep.createQueryBuilder().relation('people').of(personid)
                // .where("contact.personId = :id", {id: personid})
    // const result = await rep.find({where: {'person.id': personid}, relations: ["person"]})
    console.log(build.getSql())
    console.log(await build.getMany())
    const result = await build.getMany()
    console.log(stringify(result))
    console.log(await build.getRawMany())

    
    res.status(200).write(stringify(result), "utf8")
    }catch(e){
        console.log(e)
        res.status(500).json(e)
    }
})
export default handler
