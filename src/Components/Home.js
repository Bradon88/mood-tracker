import axios from 'axios'
import {Link} from 'react-router-dom'


const Home = () => {
    return (
        <div className='home'>
            <div className='welcome-parent'>
                <h1 className='welcome'>Welcome to Mood Tracker!</h1>
            </div>
<<<<<<< HEAD
            
            <div className='landing-page-text-parent'>
                <h2 className='landing-page-text'>
                Get simple and useful insight into yourself! 
                </h2>
=======
                <div className='landing-page-text-parent'>
                    <h3 className='landing-page-text'>
                    Get simple and useful insight into yourself! 
                    </h3>
>>>>>>> master
                
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