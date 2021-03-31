import React, {Component} from 'react'
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import IconButton from '@material-ui/core/IconButton'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import './CurrentMood.scss'
import axios from 'axios';
import {Link} from 'react-router-dom'


class CurrentMood extends Component{

    constructor(props){
        super(props);

        this.state = {
            mood: '',
            activity_notes: '',
            date: '',
            newPost: false
        }
    }

    addMood = async(e) => {
        e.preventDefault();
        const {mood, activity_notes} = this.state;
        try{
            await axios.post
            ('/api/mood', {mood, activity_notes})
            this.props.history.push('/Main')
        } catch {
            alert(`Couldn't add your mood, sry :/`)
        }
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    toggleNewPost = () => {
        this.setState({
            newPost: !this.state.newPost
        })
    }

    render(){

      
        return(
            <div className="icons">
                <h1>How are you feeling today?</h1>
            <div>
            <form onSubmit={this.addMood}>
                <IconButton onClick= {() => {
                    this.setState({ mood: 1 })
                }}><SentimentVeryDissatisfiedIcon
                className='sad button' 
                /></IconButton>
                   
                <IconButton onClick= {() => {
                    this.setState({ mood: 2 })
                }}><SentimentDissatisfied 
                className = 'bummed button'
                /></IconButton>

                <IconButton onClick= {() => {
                    this.setState({ mood: 3 })
                }}><SentimentSatisfiedIcon 
                className = 'meh button'
                /></IconButton>

                    
                <IconButton onClick= {() => {
                    this.setState({ mood: 4 })
                }}><SentimentSatisfiedAltIcon
                className = 'happy button'
                /></IconButton>
                    
                <IconButton onClick= {() => {
                    this.setState({ mood: 5 })
                }}><SentimentVerySatisfiedIcon
                className = 'stoked button'
                /></IconButton>
               
                    {/* <br></br>
                    <h2>What have you been doing?</h2>
                    <input
                    placeholder="Activity Notes"
                    autoComplete='off'
                    type='text'
                    name='activity_notes'
                    className='input-field'
                    value={this.state.activity_notes}
                    onChange={this.changeHandler}
                    /> */}
                    <br></br>
                    <br></br>
                    {/* <TextField
                    type='date'
                    name='date'
                    value={this.state.date}
                    onChange={this.changeHandler}/> */}

                    <br></br>
                    <br></br>
                    <button 
                    className="register-btn"
                    type='submit'
                    value='addPost'
                    onClick={this.toggleNewPost}>Add Mood
                        {/* OPTIONAL add alert with console.log for submission */}
                    </button>
                    <div>
                        <Link to='/Main/Chart'>
                            <button className='btn'>Back To Mood Display
                                {/* <ArrowForwardIosIcon /> */}
                            </button>
                        </Link>
                    </div>
                    
                    </form>
                </div>
            </div>
            
        )
};

}
export default CurrentMood;