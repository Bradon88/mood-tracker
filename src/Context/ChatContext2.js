import { useState, useEffect, createContext, useContext } from "react"
import {AuthContext} from './AuthContext';
import io from "socket.io-client"

export const ChatContext2 = createContext(null)
export const ChatProvider2=(props) => {
   const {user} = useContext(AuthContext)
   const [messages, setMessages] = useState([])
   const [socket, setSocket] = useState(null)
   const [socketRoom, setSocketRoom] = useState()

   useEffect(() => {
      if (socketRoom && !socket) {
         setSocket(
            io('ws://localhost:3333', {
               query: {
                  "roomname": socketRoom
               }
            })
            // io('ws://localhost:3333', {
            //    reconnectionDelayMax: 10000,
            //    auth: {
            //       token: "123"
            //    },
            //    query: "stuff=123"
            // })
         )
      } else if (
         !socketRoom && socket 
      ){
         socket.disconnect()
      }
   }, [socket, socketRoom])
   
   useEffect(() => {
      if (socket) {
         socket.on("receive-message", (body) => {
            console.log(body)
            setMessages((prevMessages) => [...prevMessages, body])
         })
      }
   }, [socket])

   return(
      <ChatContext2.Provider value={{messages, socket, setSocketRoom}}>
         {props.children}
      </ChatContext2.Provider>
   )
}