import {Link} from 'react-router-dom'

const Header = () => {
    return (
        <div>
            <h2>Mood Tracker</h2>
            <Link to='/Main'>Current Mood</Link>
            <Link to='/Chat'>Chat</Link>
            <Link to='/Register'>Register</Link>
            <Link to='/Login'>Login</Link>

        </div>
    )
}

export default Header