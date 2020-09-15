import {NextApiRequest, NextApiResponse} from 'next';
import { removeAuthCookie } from '../../../libs/auth';

export default function logout(_req:NextApiRequest, res:NextApiResponse){
    removeAuthCookie(res)
    res.writeHead(301, {Locaiton: '/'})
    res.end()
}