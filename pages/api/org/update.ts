import { getDatabaseConnection } from "../../../libs/db";
import { Organization } from "../../../src/entity/Organization";

import handler from '../../../libs/handler'

handler
// .use(authByRole([UserRole.admin]))
.post(async (req, res)=>{
    const {id, name, brief, website, ostatus, createbyId, mailext, member}= req.body
    const rep = (await getDatabaseConnection()).getRepository<Organization>('organization')
    // const dbrep = db.getRepository<Organization>('organization')
    if(!id){
        const org = new Organization()
        org.brief =brief
        org.name = name
        org.status = ostatus
        org.website = website
        org.createbyId = createbyId
        org.mailext = mailext
        org.member = member?member:false
        const result = await rep.save(org)
        res.status(200).json(result)
    }else{
        const result=await rep.findOne({id})
        if(result){
            result.brief =brief
            result.name = name
            result.status = ostatus
            result.website = website
            result.createbyId = createbyId
            result.mailext = mailext
            result.member = member?member:result.member
            const ret = await rep.save(result)
            res.status(200).json(ret)
        }else{
            res.status(404).json({"messge": "cannot find the organization"})
        }
    }
})

export default handler