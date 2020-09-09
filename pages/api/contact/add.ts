import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'
import { Contact } from '../../../src/entity/Contact'

handler.post(async (req, res)=>{
    try{
    const rep = (await getDatabaseConnection()).getRepository<Contact>('contact');
    const {job_title, email, country, state, person} = req.body
    const contact = new Contact()
    contact.country = country
    contact.state = state
    contact.email = email
    contact.job_title = job_title
    contact.person = person
    const result = await rep.save(contact)
    res.status(200).json(result)
    }catch(e){
        res.status(500).json(e)
    }
})

export default handler