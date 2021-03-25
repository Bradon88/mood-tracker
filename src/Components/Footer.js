import {Link} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext';
import { useState, useContext} from "react";
import HomeIcon from '@material-ui/icons/Home';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';

const Footer = () => {

    const {user, logout} = useContext(AuthContext);

    return ( <div>
        { !user ? 
            null
        :
            <div className='footer'>
                <Link to='/' className='footer-links'><HomeIcon/></Link>
                <Link to='/Main' className='footer-links'><SentimentVerySatisfiedIcon/></Link>
                <Link to='/Chat' className='footer-links'><ChatBubbleIcon/></Link>
                <button onClick={() => logout()} className='footer-logout'><PowerSettingsNewIcon/></button>
            </div>
        }
    </div>
    )
}

export default Footer