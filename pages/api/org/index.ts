import handler from '../../../libs/handler'
import { authByRole } from "../../../libs/auth";
import { UserRole } from "../../../src/entity/User";
import { getDatabaseConnection } from '../../../libs/db';
import { Organization } from '../../../src/entity/Organization';
import {Not} from "typeorm";
handler
.use(authByRole([UserRole.admin]))
.get(async (_req, res)=>{
    const db = (await getDatabaseConnection()).getRepository<Organization>('organization')
    const result = await db.find({where: {status: Not('deleted')}})
    res.status(200).json(result)
})

export default handler