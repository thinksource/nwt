import { useReducer, useContext, createContext, Component, FC, ReactNode} from 'react'
// import { User } from '../interfaces'
import { User } from '../src/entity/User'
import { NextPageContext } from 'next'
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
    console.log(defaultUser)

    return (
        <UserStateContext.Provider value={defaultUser}>
            {children}
        </UserStateContext.Provider>
    )

}

UserProvider.getInitialProps = async (ctx: NextPageContext) =>{
    const cookie = ctx.req?.headers.cookie;
    return {cookie}
}

export const useUser = () => useContext(UserStateContext)