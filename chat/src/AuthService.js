import React, { useEffect, useState } from'react'
import { Children } from 'react'
import { auth } from './config/firebase'

const AuthProvider = ({Children}) =>{

    const AuthContext = React.createContext()


    const [user,setUser]=useState(null)
    useEffect(()=>{
        auth.onAuthStateChanged(user=>{
            setUser(user)
        })
    },[])

    return(
        <AuthContext.Provider value={user}>
            {Children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext,
    AuthProvider
}