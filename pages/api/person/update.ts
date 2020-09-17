import handler from '../../../libs/handler'
import { Person } from '../../../src/entity/Person'
import { getDatabaseConnection } from '../../../libs/db'

handler.post(async (req, res)=>{
    console.log(req.body)
    const {id, firstname, lastname, COVID19, belong_org, userId, expertise, title, introduction}= req.body
    const rep = (await getDatabaseConnection()).getRepository<Person>('person')
    var person:Person
    try{
    if(!id){
        person = new Person()
    }else{
        const result = await rep.findOne({id})
        if(result){
            person = result
        }else{
            person = new Person()
            person.id = id
        }
    }
    person.COVID_19 = COVID19
    person.belongOrganizationId = belong_org
    person.userId = userId
    person.first_name = firstname
    person.last_name = lastname
    person.expertise = expertise
    person.title = title
    person.introduction = introduction
    const ret= await rep.save(person)
    console.log(person)
    res.status(200).json(ret)
    }catch(e){
        res.status(500).json(e)
    }
})

export default handler