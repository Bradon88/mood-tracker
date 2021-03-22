import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import io from "socket.io-client"

const Chat = (props) => {

    const [user, setUser] = useState("")
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [socket, setSocket] = useState(null)

  useEffect(() => {
    if (!socket) {
      setSocket(io.connect())
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
      
      
      


    return <div>
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
      <input value={user} onChange={(e) => setUser(e.target.value)} />
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
    </div>
    
}

export default Chat