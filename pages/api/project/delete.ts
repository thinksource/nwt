import handler from '../../../libs/handler'
import { getDatabaseConnection } from '../../../libs/db'
import {  Project } from '../../../src/entity/Project'

import { verify } from 'jsonwebtoken'
import { GUID } from '../../../libs/auth'
import { UserRole } from '../../../src/entity/User'

handler.delete(async (req, res)=>{
    const {projectId}= req.body
    const token = verify(req.cookies.auth, GUID) as {id: string, role: UserRole, email: string}
    const rep = (await getDatabaseConnection()).getRepository<Project>('project')
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