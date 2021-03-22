import axios from 'axios'

const Home = () => {
    return (
        <div className='home'>
            <h1>Welcome to Mood Tracker!</h1>
            <h3>
                <p className='landing-page-text'>
                Get simple and useful insight into yourself! 
                </p>
                <p className='landing-page-text'>
                With just a minute on this app you can check in to see how you're feeling. For mental and 
                emotional health, seeing any trends can help you identify patterns and possible triggers 
                in your daily life.
                </p>

                <p className='landing-page-text'>
                For both the ups and the downs! It's important to record both the important and mundane days in life.
                </p>

                <p className='landing-page-text'>
                Are you a parent? Or an employer? Here you can create a team and see how your kids or employees are
                doing overall.
                </p>

                <p className='landing-page-text'>
                Lack of emotional health effects kid's social upbringing, school outcomes, and overall
                lust for life.
                </p>

                <p className='landing-page-text'>
                In a business setting, it effects an employee's productivity and feeling of fulfillment from their work.
                </p>

                <p className='landing-page-text'>
                As a team leader, you can monitor trends to make needed changes or offer help if appropriate.
                </p>
            </h3>

        </div>
    )
}

export default Home