import axios from 'axios'
import {Link} from 'react-router-dom'


const Home = () => {
    return (
        <div className='home'>
            <h1 className='welcome'>Welcome to Mood Tracker!</h1>
            <h3>
                <p className='landing-page'>
                Get simple and useful insight into yourself! 
                </p>
                
                <p className='landing-page'>
                With just a minute on this app you can check in to see how you're feeling. 
                </p>

                <p className='landing-page'>
                For mental and emotional health, seeing any trends can help you identify patterns and possible triggers 
                in your daily life.
                </p>

                <p className='landing-page'>
                For both the ups and the downs! It's important to record both the important and mundane days in life.
                </p>

                <p className='landing-page'>
                Are you a parent? Or an employer? Here you can create a team and see how your kids or employees are
                doing overall.
                </p>

                <p className='landing-page'>
                Lack of emotional health effects kid's social upbringing, school outcomes, and overall
                lust for life.
                </p>

                <p className='landing-page'>
                In a business setting, it effects an employee's productivity and feeling of fulfillment from their work.
                </p>

                <p className='landing-page'>
                As a team leader, you can monitor trends to make needed changes or offer help if appropriate.
                </p>
                
                <Link to='/Register'className='landing-page-link'>Register for an Account</Link>
                <Link to='/Login'className='landing-page-link'>Login</Link>
            </h3>
        </div>
    )
}

export default Home