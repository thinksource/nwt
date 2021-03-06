
import {getDatabaseConnection} from '../../../libs/db';
import {User, UserRole, pwhash} from '../../../src/entity/User';

import {setAuthCookie} from '../../../libs/auth'

import handler from '../../../libs/handler'


handler.post(async (req, res)=>{
    let message:string;
    try{
    const db = await getDatabaseConnection()
    
    const dbrep = db.getRepository<User>('user');
    const {email, password} = req.body

    const result= await dbrep.findOne({where : {email}})
    if (result){
        const pw_hash = pwhash(password, result.salt)
        if (pw_hash === result.password && result.role !== UserRole.blocked){
            const claim =  {email: result.email, id: result.id, role: result.role}
            const jwt = setAuthCookie(res, claim)
            res.status(200).json({Userid:result.id, jwt})
        }else{
            message = "can not Login"
            res.status(401).json({message})
        }
    }else{
        message = "can not find the email address";
        res.status(401).json({message})
    }
}catch(e){
    res.status(500).json(e)
} 
})

export default handler