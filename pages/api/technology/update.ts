import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'
import { Technology } from '../../../src/entity/Technology';

handler.post(async (req, res)=>{
    try{
    const rep = (await getDatabaseConnection()).getRepository<Technology>('technology');
    // const {job_title, email, country, state, person} = req.body
    const technology = rep.create(req.body)
    console.log("======technology======")
    console.log(technology)
    const result = await rep.save(technology)
    res.status(200).json(result)
    }catch(e){
        res.status(500).json(e)
    }
})

export default handler