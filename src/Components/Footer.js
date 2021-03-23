import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <Link to='/' className='footer-links'>Home</Link>
            <Link to='/Main' className='footer-links'>Current Mood</Link>
            <Link to='/Chat' className='footer-links'>Chat</Link>
            <Link to='/Register' className='footer-links'>Register</Link>
            <Link to='/Login' className='footer-links'>Login</Link>

        </div>
    )
}

export default Footer