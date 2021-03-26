import {Link} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext';
import { useState, useContext} from "react";

const Header = () => {

    const {user, logout} = useContext(AuthContext);

    return (
        <div>
            { !user ?
            null
            :
            <div className='header'>
                <h1>Mood Tracker</h1>
                <Link to='/' className='header-links'>Home</Link>
                <Link to='/Main' className='header-links'>Current Mood</Link>
                <Link to='/Team' className='header-links'>My Teams</Link>
                <Link to='/Chat' className='header-links'>Chat</Link>
                <button onClick={() => logout()} className='header-logout'>Logout</button>
            </div>
            }
        </div>
    )
}

export default Header