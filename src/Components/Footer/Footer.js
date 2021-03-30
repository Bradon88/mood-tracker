import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext';
import { useContext} from "react";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PeopleIcon from '@material-ui/icons/People';
import './Footer.scss'

const Footer = () => {

    const {user, logout} = useContext(AuthContext);

    return ( <div>
        { !user ? 
            null
        :
            <div className='footer'>
                <Link to='/' className='footer-links'><HomeRoundedIcon/></Link>
                <Link to='/Main' className='footer-links'><SentimentVerySatisfiedIcon/></Link>
                <Link to='/Team' className='footer-links'><PeopleIcon/></Link>
                <Link to='/Chat' className='footer-links'><ChatBubbleIcon/></Link>
                <button onClick={() => logout()} className='footer-logout'><PowerSettingsNewIcon/></button>
                <p className='copyright'>© 2021 Mood Tracker</p>
            </div>
        }
    </div>
    )
}

export default Footer