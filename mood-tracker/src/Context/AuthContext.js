import axios from 'axios'
import React, {createContext, useState} from 'react'
import{useHistory} from "react-router-dom";



export const AuthContext = createContext(null)
export const AuthProvider=(props) => {
   const [user, setUser] = useState(null)
   const {push} = useHistory()

   const login = (body) => {
      axios.post('/auth/login', body).then(res => {
         setUser(res.data)
         // push('/Main')
      })
      .catch((err) => console.log(err))
   }
   const register = (body) => {
      axios.post('/auth/register', body).then(res => {
         setUser(res.data)
         // push('/Main')
      })
      .catch((err) => console.log(err))
   }

   const logout = () => {
      axios.post('/auth/logout', '').then(res =>{
         setUser(null)
         push('/')
      })
      .catch((err) => console.log(err))
   }

   const getUser = () => {
      axios.get('/auth/me').then(({data}) => setUser(data))
   }

   return(
      <AuthContext.Provider value={{user, setUser, login, register, logout}}>
         {props.children}
      </AuthContext.Provider>
   )
}