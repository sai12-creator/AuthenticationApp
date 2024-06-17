import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import { createContext } from 'react'


const AuthContext = createContext();


 export const AuthProvider = ({children}) => {
   const [ token , setToken] = useState(null);
   const [userData, setUserData] = useState(null);
   const [ isAuthenticated, setAuthenticated] = useState(false);
   const storedData = JSON.parse(localStorage.getItem('user_data'));


   useEffect(()=>{
      const fetchLogin =async() =>{
    if(storedData){
        const { user, userToken} = storedData;
        setToken(userToken);
        setUserData(user);
        setAuthenticated(true);
    }
   }
    fetchLogin();
   }, [])

   const login = (newData, newToken) =>{
    localStorage.setItem(
            'user_data',
            JSON.stringify({userToken : newToken , user : newData})
    )
    setToken(newToken);
    setUserData(newData);
    setAuthenticated(true);
   }
   const logout = () =>{
    localStorage.removeItem('user_data')
    setToken(null);
    setUserData(null);
    setAuthenticated(false);
   }
   const contextValue = { login, token, isAuthenticated, userData, logout };
  return (
  <AuthContext.Provider  value={contextValue}>
     {children}
  </AuthContext.Provider>
  )
}




export const useAuth = () => useContext(AuthContext)