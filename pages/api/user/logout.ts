import {NextApiRequest, NextApiResponse} from 'next';
import { removeAuthCookie } from '../../../libs/auth';
import cookie from 'cookie';
import {global} from '../../../libs/global'
export default function logout(_req:NextApiRequest, res:NextApiResponse){
    const auth_cookie = cookie.serialize('auth', '', {
        maxAge: -1,
        httpOnly: true,
        path: '/',
      })
    global.authcookie=""
    removeAuthCookie(res)
    res.writeHead(301, {Locaiton: '/'})
    res.end()
}