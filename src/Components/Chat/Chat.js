import React, { useState, useEffect, useContext} from 'react';
import {ChatContext} from '../../Context/ChatContext';
import {AuthContext} from '../../Context/AuthContext'
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';



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
        container: {
          bottom: 0
        },
        bubbleContainer: {
          width: "100%",
          display: "flex" //new added flex so we can put div at left and right side
          //check style.css for left and right classnaeme based on your data
        },
        bubble: {
          border: "0.5px solid black",
          borderRadius: "10px",
          margin: "5px",
          padding: "10px",
          display: "inline-block"
        }
      }));

    const classes = useStyles();
      
    const dummyData = [
      {
        message: "1: This should be in left",
        direction: "left"
      },
      {
        message: "2: This should be in right",
        direction: "right"
      },
      {
        message: "3: This should be in left again",
        direction: "left"
      },
      {
        message: "4: This should be in right again",
        direction: "right"
      }
    ];

    const chatBubbles = dummyData.map((obj, i = 0) => (
      <div className={`${classes.bubbleContainer} ${obj.direction}`} key={i}>
        <div key={i++} className={classes.bubble}>
          <div className={classes.button}>{obj.message}</div>
        </div>
      </div>
    )); 
      


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
          <p>This is the chat</p>
          {messages.map((m) => (
            <div>
              {m.user}: {m.message}
            </div>
          ))}
        <div>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={() => socket.emit("send-message", { message, user })}>
            TEST
          </button>
        </div>
      </div>
      <div className={classes.container}>
        {chatBubbles}
      </div>
    </div>
    ) 
}

export default Chat