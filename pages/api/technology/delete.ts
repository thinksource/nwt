import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'

import { verify } from 'jsonwebtoken'
import { GUID } from '../../../libs/auth'
import { UserRole } from '../../../src/entity/User'
import { Technology } from '../../../src/entity/Technology'

handler.delete(async (req, res)=>{
    const {projectId}= req.body
    const token = verify(req.cookies.auth, GUID) as {id: string, role: UserRole, email: string}
    const rep = (await getDatabaseConnection()).getRepository<Technology>('technology')
    const result = await rep.findOne({where: {id: projectId, createbyId: token.id}})
    if(result || token.role === "admin"){
        const r=await rep.delete({id: projectId})
        console.log(r)
        res.status(200).json({message: "successful delete"})
    }else{
        res.status(404).json({message: "Do not have right to delete or the entity is not exist"})
    }
})

export default handler