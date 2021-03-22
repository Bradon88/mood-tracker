import {Link} from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <Link to='/' className='link'>Home</Link>
            <Link to='/Main' className='link'>Current Mood</Link>
            <Link to='/Chat' className='link'>Chat</Link>
            <Link to='/Register' className='link'>Register</Link>
            <Link to='/Login' className='link'>Login</Link>
        </div>
    )
}

export default Footer