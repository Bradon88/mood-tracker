import {Link} from 'react-router-dom'
import {AuthContext} from '../../Context/AuthContext';
import { useContext} from "react";
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import PeopleIcon from '@material-ui/icons/People';
import './Footer.scss'
import CreateIcon from '@material-ui/icons/Create';

const Footer = () => {

    const {user, logout} = useContext(AuthContext);

    return ( <div>
        { !user ? 
            null
        :
            <div className='footer'>
                <Link to='/' className='footer-links'><HomeRoundedIcon/></Link>
                <Link to='/Main/CurrentMood' className='footer-links'><SentimentVerySatisfiedIcon/></Link>
                <Link to='/Main/Team' className='footer-links'><PeopleIcon/></Link>
                <Link to='/Main/Chat' className='footer-links'><ChatBubbleIcon/></Link>
                <Link to='/Main/Notes' className='footer-links'><CreateIcon/></Link>
                <button onClick={() => logout()} className='footer-logout'><PowerSettingsNewIcon/></button>
                <p className='copyright'>© 2021 Mood Tracker</p>
            </div>
        }
    </div>
    )
}

export default Footer