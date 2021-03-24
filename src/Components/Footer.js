import {Link} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext';
import { useState, useContext} from "react";

const Footer = () => {

    const {user, logout} = useContext(AuthContext);

    return ( <div>
        { !user ? 
            null
        :
            <div className='footer'>
                <Link to='/' className='footer-links'>Home</Link>
                <Link to='/Main' className='footer-links'>Current Mood</Link>
                <Link to='/Chat' className='footer-links'>Chat</Link>
                <button onClick={() => logout()} className='footer-logout'>Logout</button>
            </div>
        }
    </div>
    )
}

export default Footer