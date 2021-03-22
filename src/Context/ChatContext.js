import { useState, useEffect, createContext, useContext } from "react"
import {AuthContext} from './AuthContext';
import io from "socket.io-client"


export const ChatContext = createContext(null)
export const ChatProvider=(props) => {
   const {user} = useContext(AuthContext)
   const [messages, setMessages] = useState([])
   const [socket, setSocket] = useState(null)
   useEffect(() => {
      if (user && !socket) {
         setSocket(io.connect())
      } else if (
         !user && socket
      ){
         socket.disconnect()
      }
   }, [socket])

   useEffect(() => {
      if (socket) {
         socket.on("receive-message", (body) => {
            console.log(body)
            setMessages((prevMessages) => [...prevMessages, body])
         })
      }
   }, [socket])

   return(
      <ChatContext.Provider value={{messages, socket}}>
         {props.children}
      </ChatContext.Provider>
   )
}