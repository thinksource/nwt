import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'
import { Contact } from '../../../src/entity/Contact'

handler.get(async (req, res)=>{
    const personid=req.query.id?req.query.personid:""
    const rep = (await getDatabaseConnection()).getRepository<Contact>('contact')
    const result = await rep.find({where: {'person': personid}})
    res.status(200).json(result)
})
export default handler
