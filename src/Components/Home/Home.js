import {Link} from 'react-router-dom'
import './Home.scss'


const Home = () => {
    return (
        <div className='home'>
            <div className='welcome-parent'>
                <h1 className='welcome'>Welcome to Mood Tracker!</h1>
            </div>
            
            <div className='landing-page-text-parent'>
                
                <h3 className='landing-page-text'>
                Get simple and useful insight into yourself! 
                 </h3>
                <h3 className='landing-page-text'>
                Track your daily emotional health. 
                </h3>

                <h3 className='landing-page-text'>
                 Identify any patterns or possible triggers.
                </h3>

                <h3 className='landing-page-text'>
                For all the ups and the downs!
                 </h3>
                
                 <Link to='/Register'className='landing-page-link'>Register for an Account</Link>
                <Link to='/Login'className='landing-page-link'>Login</Link>
                
            </div>
    </div>
    )
}

export default Home