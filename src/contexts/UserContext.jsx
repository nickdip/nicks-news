import React, { useState, createContext, useEffect } from 'react';
import NewsAPI from '../api/newsReaderAPI'
import { useCookies } from 'react-cookie'

const UserContext = createContext(null);

export function UserProvider( {children} ) {

    const [user, setUser] = useState({})
    const [cookies, setCookie, removeCookie] = useCookies(['username']);

    useEffect(() => {
        if (cookies.user) setUser(cookies.user)
        else setUser({})
        
    }, [])

    const loginUser = (username) => {
        console.log(username, ">>>>>username")
        NewsAPI.login(username).then((user) => {
            setUser(user)
            setCookie('username', user, { path: '/' })
        })

    }

     const logoutUser = () => {
        setUser({})
     }

    return (
        <UserContext.Provider value={{user, setUser, loginUser, logoutUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext