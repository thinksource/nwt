import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'
import { Person } from '../../../src/entity/Person';
// import { Contact } from '../../../src/entity/Contact'

handler.post(async (_req, res)=>{
    const db= await getDatabaseConnection()
    const rep = db.getRepository<Person>('person');
    const result = await rep.find({relations:["belong_organization"]})
    if(result){
        res.status(200)
        res.json(result.map(r=>r.toJSON))
    }else{
        res.status(200)
        res.json([])
    }
})