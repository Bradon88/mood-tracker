import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext';
import { useContext} from "react";
import './Header.scss'

const Header = () => {

    const {user, logout} = useContext(AuthContext);

    return (
        <div>
            
            <div className='header'>
                <h1>Mood Tracker</h1>
                <Link to='/' className='header-links'>Home</Link>
                <Link to='/Main/CurrentMood' className='header-links'>Current Mood</Link>
                <Link to='/Main/Team' className='header-links'>My Teams</Link>
                <Link to='/Main/Chat' className='header-links'>Chat</Link>
                <button onClick={() => logout()} className='header-logout'>Logout</button>
            </div>
            
        </div>
    )
}

export default Header