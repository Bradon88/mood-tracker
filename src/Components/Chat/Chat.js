import React, { useState, useEffect, useContext} from 'react';
import {ChatContext} from '../../Context/ChatContext';
import {AuthContext} from '../../Context/AuthContext'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './Chat.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

library.add(
  faPaperPlane
)


const Chat = (props) => {

  const [message, setMessage] = useState("")
  const {messages, socket} =useContext(ChatContext)
  const {user} = useContext(AuthContext)

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


  return (
    <div>
      <FormControl className = {classes.formControl}
        style={{
          width: "25%",
          display: "flex",
          flexDirection: "column"
        }}>
        <InputLabel>Select Team</InputLabel>
        <Select>
            <MenuItem>Team1</MenuItem>
            <MenuItem>Team2</MenuItem>
            <MenuItem>Team3</MenuItem>
        </Select>
      </FormControl>

      <FormControl className = {classes.formControl}
        style={{
            width: "25%",
            display: "flex",
            flexDirection: "column"
        }}>
        <InputLabel>Select Team Member</InputLabel>
        <Select>
            <MenuItem>Member1</MenuItem>
            <MenuItem>Member2</MenuItem>
            <MenuItem>Member3</MenuItem>
        </Select>
      </FormControl>
      
        <div>
          <div className="chatContainer">
            <div className="chatHeader"></div>
              <div className="screen">
                {messages.map((m) => (
                  <div className="speech-wrapper">
                    {console.log(m.user.user_id, user.user_id, 'chat')}
                      <div className={`bubble ${m.user.user_id === user.user_id ? 'sender' : 'receiver'}`}>
                        <div className={`txt ${m.user.user_id === user.user_id ? 'senderTxt' : 'receiverTxt'}`}>
                          <p className="name">
                              {m.user.first_name}
                          </p>
                          <p className="message">
                              {m.message}
                          </p>
                          <span className="timestamp">Date</span>
                        </div>  
                        <div className="bubble-arrow"></div>
                    </div>
                  </div>
                ))}
              </div>
            <div className="chatFooter">
              <div className="bodyInput">
                <input
                  className="messageInput"
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} />
                <button 
                  className="chatButton"
                  onClick={() => socket.emit("send-message", { message, user})}>
                  <FontAwesomeIcon icon={["fa", "paper-plane"]}/>
                </button>
              </div>
            </div>
          </div>
        </div>
    </div>



  ) 
}

export default Chat