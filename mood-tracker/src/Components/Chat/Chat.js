import React, { useState } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const Chat = (props) => {
    // const []

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
    </div>
}

export default Chat