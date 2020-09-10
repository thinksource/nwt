import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'
import {  Project } from '../../../src/entity/Project'

handler.post(async (req, res)=>{
    try{
    const rep = (await getDatabaseConnection()).getRepository<Project>('project');
    // const {job_title, email, country, state, person} = req.body
    const contact = rep.create(req.body)
    const result = await rep.save(contact)
    res.status(200).json(result)
    }catch(e){
        res.status(500).json(e)
    }
})

export default handler