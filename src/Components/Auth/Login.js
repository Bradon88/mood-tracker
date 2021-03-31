import React, {useState, useContext} from 'react';
import{Link} from "react-router-dom";
import {AuthContext} from '../../Context/AuthContext';
import Moodful from '../images/moodful.png'

const Login = () => {
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const {login} = useContext(AuthContext)


   return (
         <div className='form'>
            <form className='register-form' onSubmit={(event)=>{
               event.preventDefault();
               login({email, password})
            }}>
               <img className='register-logo' src={ Moodful } />
               <input variant="outlined"
                        placeholder='Email Address'
                        className='input-field'
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                  <input variant="outlined"
                        placeholder='Password'
                        className='input-field'
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
               <button  type='submit'
                     className='register-btn'>Sign in
            </button>

            <Link to="/Register">
            Don't have an account? Please Register
            </Link>
            </form>
         </div>
   );
}

export default Login;