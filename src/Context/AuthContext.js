import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'
import{useHistory} from "react-router-dom";



export const AuthContext = createContext(null)
export const AuthProvider=(props) => {
   const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
   const [token, setToken] = useState(localStorage.getItem('token'))
   const {push} = useHistory()

   useEffect(()=> {
      axios.defaults.headers.common["Authorization"]= 'Bearer ' + token
   },[user, token])

   const login = (body) => {
      axios.post('/auth/login', body).then(res => {
         localStorage.setItem("token", res.data.token)
         localStorage.setItem("user", JSON.stringify(res.data.user))
         setToken(res.data.token)
         setUser(res.data.user)
         push('/Main')
      })
      .catch((err) => console.log(err))
   }
   const register = (body) => {
      axios.post('/auth/register', body).then(res => {
         localStorage.setItem("token", res.data.token)
         localStorage.setItem("user", res.data.user)
         setToken(res.data.token)
         setUser(res.data.user)
         push('/Main')
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
      axios.get('/auth/user').then(({data}) => setUser(data))
   }

   const updateUser = () => {
      axios.post('/auth/user').then(({data}) => setUser(data))
   }

   return(
      <AuthContext.Provider value={{user, setUser, login, register, logout, updateUser}}>
         {props.children}
      </AuthContext.Provider>
   )
}