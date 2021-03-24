import axios from 'axios'
import {Link} from 'react-router-dom'
import {AuthContext} from '../Context/AuthContext';
import { useContext} from "react";


const Home = () => {

    const { user } = useContext(AuthContext);

    return (
        <div className='home'>
            <h1 className='welcome'>Welcome to Mood Tracker!</h1>
            <h3>
                <h2 className='landing-page-text'>
                Get simple and useful insight into yourself! 
                </h2>
                
                <h2 className='landing-page-text'>
                Track your daily emotional health. 
                </h2>

                <h2 className='landing-page-text'>
                Identify any patterns or possible triggers.
                </h2>

                <h2 className='landing-page-text'>
                For all the ups and the downs!
                </h2>
                { !user ?
                <div>
                    <Link to='/Register' className='landing-page-link'>Register for an Account</Link>
                    <Link to='/Login' className='landing-page-link'>Login</Link>
                </div>
                : null
                }
            </h3>
        </div>
    )
}

export default Home