import React, {Component} from 'react'
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import './CurrentMood.scss'

class CurrentMood extends Component{

    render(){

      
        return(
            <div className="icons">
                <h1>How are you feeling today?</h1>


                <IconButton><SentimentVeryDissatisfiedIcon
                className='sad button' 
                style={{
                    
                    // color: "#264653"
                }}/></IconButton>

                <IconButton><SentimentDissatisfied 
                className = 'bummed button'
                style={{
                    // height: "50px",
                    // width: "50px",
                    // color: "#e9c46a"
                }}/></IconButton>

                <IconButton><SentimentSatisfiedIcon 
                className = 'meh button'
                style={{
                    // height: "50px",
                    // width: "50px"
                }}/></IconButton>

                <IconButton><SentimentSatisfiedAltIcon
                className = 'happy button'
                style={{
                    // height: "50px",
                    // width: "50px"
                }}/></IconButton>

                <IconButton><SentimentVerySatisfiedIcon
                className = 'stoked button'
                style={{
                    // height: "50px",
                    // width: "50px"
                }}/></IconButton>
                
                <div>
                    <br></br>
                    <TextField
                    placeholder="Notes">
                    </TextField>
                    <br></br>
                    <br></br>
                    <button className="btn">Submit
                        {/* add alert with console.log for submission */}
                    </button>
                </div>

                
            </div>
            
        )
};

}
export default CurrentMood;