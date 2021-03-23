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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { borders } from '@material-ui/system';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import io from "socket.io-client"
import './Chat.scss'


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
          <p>This is the chat</p>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              {messages.map((m) => (
                  <div className="speech-wrapper">
                    {console.log(m.user.user_id, user.user_id, 'chat')}
                    <div className={`bubble ${m.user.user_id === user.user_id ? 'sender' : 'receiver'}`}>
                        <div className="txt">
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
              <form className={classes.form} onSubmit={(event)=>{
                event.preventDefault();
                socket.emit("send-message", { message, user})
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="message"
                      label="Message"
                      type="message"
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Send
                    </Button>
                  </Grid>
                </Grid>
              </form>  
            </div>
            
          </Container>
        </div>
        
    </div>



  ) 
}

export default Chat