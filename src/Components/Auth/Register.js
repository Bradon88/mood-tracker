import React, {useState, useContext} from 'react';
import{Link} from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {AuthContext} from '../../Context/AuthContext';




const useStyles = makeStyles((theme) => ({
   paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
   },
   form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
   },
   submit: {
      margin: theme.spacing(3, 0, 2),
   },
}));

const Auth = (props) => {
   const classes = useStyles();
   const [first_name, setFirstName] = useState("")
   const [last_name, setLastName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const {login, register} = useContext(AuthContext)

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <form className={classes.form} onSubmit={(event)=>{
               event.preventDefault();
               register({first_name, last_name, email, password})
            }}>
               <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                     <TextField
                           autoComplete="fname"
                           name="firstName"
                           variant="outlined"
                           required
                           fullWidth
                           id="firstName"
                           label="First Name"
                           autoFocus
                           value={first_name}
                           onChange={(e) => setFirstName(e.target.value)}
                        />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastname"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />
                  </Grid>
                  {/* <Grid item xs={12}>
                     <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="picture"
                        label="Picture"
                        type="file"
                        id="password"
                        autoComplete="current-password"
                     />
                  </Grid> */}
               </Grid>
               <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
               >
                  Register
               </Button>
            </form>
               <Link to="/Login">
               Already have an account? Sign in
               </Link>
         </div>
      </Container>
   );
}

export default Auth;