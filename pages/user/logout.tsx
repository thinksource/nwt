import {  GetServerSideProps } from "next"
import cookie from 'cookie';

const logout = ()=>{
   return (<div/>)
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const auth_cookie = cookie.serialize('auth', '', {
        maxAge: -1,
        httpOnly: true,
        path: '/',
      })
    const header = {'Locaiton': '/','Set-Cookie': auth_cookie}
    
    ctx.res.writeHead(302, header).end()

    return { props: { names: ['john', 'doe', 'michael', 'bruno'] } };
};

export default logout

// export default async function logout(_req: NextApiRequest, res:NextApiResponse ) {
//     removeAuthCookie(res)
//     res.writeHead(302, { Location: '/' })
//     res.json({})
//   }