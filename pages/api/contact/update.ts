import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'
import { Contact } from '../../../src/entity/Contact'

handler.post(async (req, res)=>{
    try{
    const db = await getDatabaseConnection()
    const rep = db.getRepository<Contact>('contact');
    // const {job_title, email, country, state, person} = req.body
    // const {personId} = req.body
    
    // const prep = db.getRepository<Person>('person');
    // const person = await prep.findOne({where: {id: personId}})
    
    const contact = rep.create(req.body as Contact) 
    // if(person){
    //     contact.creatbyId = person
    // }
    console.log(contact)
    const result = await rep.save(contact)
    res.status(200).json(result)
    }catch(e){
        res.status(500).json(e)
    }
})

export default handler