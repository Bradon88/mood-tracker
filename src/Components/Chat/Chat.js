import React, { useState, useEffect, useContext} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import {ChatContext} from '../../Context/ChatContext';
import {AuthContext} from '../../Context/AuthContext';
import {TeamContext} from '../../Context/TeamContext';
import moment from 'moment'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import './Chat.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";


library.add(
  faPaperPlane
)



const Chat = (props) => {
  const {messages, socket, setSocketRoom} =useContext(ChatContext)
  const {user} = useContext(AuthContext)
  const {
    myTeamName, 
    chatRooms, 
    team, 
    teamMemberList, 
    getTeam, 
    getMembers, 
    getMyChatRooms, 
    getMyTeamName
  } =useContext(TeamContext)
  const [message, setMessage] = useState("")
  const [teamMember, setTeamMember] =useState()
  const [theChatRoom, setTheChatRoom] =useState()
  const [firstName, setFirstName] =useState()
  const {room} = useParams();
  const {push} = useHistory();
  const date = new Date ();
  

  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

  const classes = useStyles();

  useEffect(() => {
    getTeam()
    // getMembers()
    getMyTeamName()
    getMyChatRooms()

}, [])

  useEffect(()=>{
    if(room){setSocketRoom(room)}
  },[room, setSocketRoom])

console.log('----chat team name', myTeamName)
console.log('----chat members', teamMemberList)
console.log(chatRooms, "chatrooms chatjs")
console.log(user, 'chatjs')
console.log(theChatRoom, 'the chat room of member')
  return (
    <div>
      <div>
        {team?.map((team, index)=>{
                      return(
                          <div key={index}>
                              <div>
                                  {team.team_name}
                              </div>
                          </div>
                      )
                  }) || null}
      </div>
      <div>
        {myTeamName?.map((teamName, index)=>{
                      return(
                          <div key={index}>
                              <div>
                                  {teamName.team_name}
                              </div>
                          </div>
                      )
                  }) || null}
      </div>
      {/* <h2>Team Chat</h2> */}
      <FormControl className = {classes.formControl}
        style={{
            width: "35%",
            display: "flex",
            flexDirection: "column"
        }}>
        <InputLabel>Team Member</InputLabel>
        <Select
        
          value={theChatRoom?.chat_room_name}
          onChange={(e)=> {
            setTheChatRoom(e.target.value)
            push(`/Main/Chat/${e.target.value}`)
            console.log(theChatRoom, '------onchange')
          }}>
            {chatRooms?.map((memberRoom, index)=>{
            return(
              <MenuItem value={memberRoom.chat_room_name} key={index}>
                {
                  user.is_admin ?
                  `${memberRoom.first_name} ${memberRoom.last_name}` :
                  `${memberRoom.admin_first_name} ${memberRoom.admin_last_name}`
                }
              </MenuItem>
            )
          })|| null}
        </Select>
      </FormControl>
      {theChatRoom ? (
        <div>
          <div className="chatContainer">
            <div className="chatHeader"></div>
              <div className="screen">
                {messages.map((m, index) => {
                  const mDate = new Date ()
                  return(
                    <div className="speech-wrapper" key={index}>
                      {console.log(m.user.user_id, user.user_id, 'chat')}
                        <div className={`${m.user.user_id === user.user_id ? 'sender' : 'receiver'}`}>
                          <div className={`${m.user.user_id === user.user_id ? 'senderTxt' : 'receiverTxt'}`}>
                            <p className="name">
                                {m.user.first_name}
                            </p>
                            <p className="message">
                                {m.message}
                            </p>
                            <span className="timestamp">
                              {moment(mDate).format('MMM Do YYYY, h:mm a')}
                            </span>
                          </div>  
                      </div>
                    </div>
                  )
                })}
              </div>
            <div className="chatFooter">
              <div className="bodyInput">
                <input
                  className="messageInput"
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} />
                <button 
                  className="chatButton"
                  onClick={() => {
                    socket.emit("send-message", { message, user, date})
                    setMessage('')
                  }}
                >
                  <FontAwesomeIcon icon={["fa", "paper-plane"]}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      ):null}
    
    </div>




  ) 
}

export default Chat