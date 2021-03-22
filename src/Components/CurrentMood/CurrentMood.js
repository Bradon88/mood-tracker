import React, {Component} from 'react'
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import TextField from '@material-ui/core/TextField'
class CurrentMood extends Component{

    render(){

      
        return(
            <div className="icons">
                <h1>How are you feeling today?</h1>
                <SentimentVeryDissatisfiedIcon 
                style={{
                    height: "50px",
                    width: "50px"
                }}>1</SentimentVeryDissatisfiedIcon>

                <SentimentDissatisfied 
                style={{
                    height: "50px",
                    width: "50px"
                }}>2</SentimentDissatisfied>

                <SentimentSatisfiedIcon 
                style={{
                    height: "50px",
                    width: "50px"
                }}>3</SentimentSatisfiedIcon>
                <SentimentSatisfiedAltIcon
                style={{
                    height: "50px",
                    width: "50px"
                }}>4</SentimentSatisfiedAltIcon>
                <SentimentVerySatisfiedIcon
                style={{
                    height: "50px",
                    width: "50px"
                }}>5</SentimentVerySatisfiedIcon>

                <div>
                    <TextField
                    placeholder="Notes">
                        
                    </TextField>
                </div>
            </div>
            
        )
};

}
export default CurrentMood;