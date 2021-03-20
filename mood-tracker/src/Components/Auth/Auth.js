import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
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
   // const [firstName, setFirstName] = useState("")
   // const [lastName, setLastName] = useState("")
   // const [email, setEmail] = useState("")
   // const [password, setPassword] = useState("")
   // const {login, register} = useContext(AuthContext)

   return (
      <Container component="main" maxWidth="xs">
         <CssBaseline />
         <div className={classes.paper}>
            <form className={classes.form} noValidate>
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
                        autoComplete="lname"
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
               <Grid container justify="flex-end">
                  <Grid item>
                     <Link href="#" variant="body2">
                     Already have an account? Sign in
                     </Link>
                  </Grid>
               </Grid>
            </form>
         </div>
      </Container>
   );
}

export default Auth;