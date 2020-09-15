import { NextPageContext } from "next"
import { useRouter } from "next/router"
import cookie from 'cookie'
import { useEffect} from "react"


const Logout=()=>{
    const router = useRouter()
    useEffect(()=>{
        router.push('/')
    })
    return <p>Redirecting...</p>
}

export const getServerSideProps = async (ctx: NextPageContext) => {
    if(ctx.req && ctx.res){
        const res=ctx.res
        const auth_cookie = cookie.serialize('auth', '', {
            maxAge: -1,
            httpOnly: true,
            path: '/',
          })
        
          res.setHeader('Set-Cookie', auth_cookie)
        //   res.setHeader('Locaion', '/')
        //   res.statusCode =301
        //   res.end()
    }
    return {props:{}}
}
export default Logout