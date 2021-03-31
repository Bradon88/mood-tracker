import { useState, useEffect, createContext } from "react"
// import {AuthContext} from './AuthContext';
import io from "socket.io-client"

const RemoveDuplicates = (array, key) => {
   return array.reduce((arr, item) => {
      const removed = arr.filter(i => i[key] !== item[key]);
      return [...removed, item];
   }, []);
};

let currentSocket
export const ChatContext = createContext(null)
export const ChatProvider=(props) => {
   // const {user} = useContext(AuthContext)
   const [messages, setMessages] = useState([])
   const [socket, setSocket] = useState(null)
   const [socketRoom, setSocketRoom] = useState()

   useEffect(() => {
      if (currentSocket) {
         currentSocket.disconnect()
      }
      if(socketRoom) (
         currentSocket = io('ws://localhost:3333', {
            query: {
               "roomname": socketRoom
            }
         })
      )
   }, [socketRoom])

   
   useEffect(() => {
      if (currentSocket) {
         let roomMessages = JSON.parse( localStorage.getItem(socketRoom) || '[]' )
         setMessages(roomMessages)
         currentSocket.emit('send-message-sync', roomMessages)
         currentSocket.on('receive-message-sync', (otherClientMessages)=>{
            roomMessages = JSON.parse( localStorage.getItem(socketRoom) || '[]' )
            const messagesInSync = (
               roomMessages.length === otherClientMessages.length
            ) && otherClientMessages.reduce((inSync, message)=>{
               if(!inSync){
                  return inSync
               }
               return Boolean(roomMessages.find((newmessage) => (newmessage.id === message.id)))
            }, true);

            if(!messagesInSync){
               let syncedMessages= [...roomMessages, ...otherClientMessages];
               syncedMessages=RemoveDuplicates(syncedMessages, 'id').sort((a,b)=> new Date(b.date) - new Date(a.date))
               setMessages(syncedMessages)
               localStorage.setItem(socketRoom, JSON.stringify(syncedMessages))
               currentSocket.emit('send-message-sync', syncedMessages)
            }
         })
         currentSocket.on("receive-message", (body) => {
            let roomMessages = JSON.parse( localStorage.getItem(socketRoom) || '[]' )
            console.log(body)
            const newMessages= [...roomMessages, body]
            setMessages(newMessages)
            localStorage.setItem(socketRoom, JSON.stringify(newMessages))
      
         })
      }
   }, [socketRoom])
   
   return(
      <ChatContext.Provider value={{messages, socket:currentSocket, setSocketRoom}}>
         {props.children}
      </ChatContext.Provider>
   )
}