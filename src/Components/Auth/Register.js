import React, {useState, useContext} from 'react';
import{Link} from "react-router-dom";
import {AuthContext} from '../../Context/AuthContext';
import './Register.scss'
import Moodful from '../images/moodful.png'

const Auth = () => {
   const [first_name, setFirstName] = useState("")
   const [last_name, setLastName] = useState("")
   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const {register} = useContext(AuthContext)

   return (
         <div className='form'>
            <form className='register-form' onSubmit={(event)=>{
               event.preventDefault();
               register({first_name, last_name, email, password})
            }}>
            <img className='register-logo' src={ Moodful } />
            <input   autoComplete="off"
                     placeholder='First Name'
                     className='input-field'
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
            <input variant="outlined"
                        placeholder='Last Name'
                        className='input-field'
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastname"
                        value={last_name}
                        onChange={(e) => setLastName(e.target.value)}
                     />
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
            <input      variant="outlined"
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
                     className='register-btn'>Register
            </button>


               <Link to="/Login">
               Already have an account? Sign in
               </Link>
            </form>
         </div>
   );
}

export default Auth;