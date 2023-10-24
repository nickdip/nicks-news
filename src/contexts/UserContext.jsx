import React, { useState, createContext } from 'react';
import NewsAPI from '../api'

const UserContext = createContext(null);

export function UserProvider( {children} ) {

    const [user, setUser] = useState({});

    const loginUser = (username) => {
        NewsAPI.login(username).then((user) => {
            setUser(user)
        })
    }

    return (
        <UserContext.Provider value={{user, setUser, loginUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext