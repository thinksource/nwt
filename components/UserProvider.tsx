import { useContext, createContext, ReactNode} from 'react'
// import { User } from '../interfaces'
import { User } from '../src/entity/User'
// import { NextPageContext } from 'next'
import { decodeAuthCookie } from '../libs/user'
// const defaultUser: User = new User()


var UserStateContext:React.Context<User>
type Props = {
    cookie?: string,
    children?: ReactNode
}
export const UserProvider = ({cookie, children }: Props)=>{
    console.log(cookie)
    let defaultUser = decodeAuthCookie(cookie?cookie:'')
    UserStateContext= createContext<User>(defaultUser)
    // console.log(defaultUser)

    return (
        <UserStateContext.Provider value={defaultUser}>
            {children}
        </UserStateContext.Provider>
    )

}

// export const getServerSideProps =  async (ctx: NextPageContext) =>{

//     const cookie= cookies(ctx)
//     console.log(cookie)
//     console.log("======user provider========")
//     console.log(cookie)
//     return { props: { cookie } }
// }

export const useUser = () => useContext(UserStateContext)