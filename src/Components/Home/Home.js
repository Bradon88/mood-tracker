import {Link} from 'react-router-dom'
import Moodful from '../images/moodful.png'
import './Home.scss'


const Home = () => {
    return (
        <div className='home-main'>
            <img className='moodful-logo' src={ Moodful } />
            <h1 className='home-logo'>MOOD<span className='beige'>FUL</span></h1>
            <Link to='/Login' className='login-btn'>Sign In</Link>
            <Link to='/Register' className='login-btn'>Sign Up</Link> 
           
        </div>
    )
}

export default Home