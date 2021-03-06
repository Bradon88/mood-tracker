import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import {Link} from 'react-router-dom';
import moment from 'moment'
import axios from 'axios'
import SentimentDissatisfied from '@material-ui/icons/SentimentDissatisfied'
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied'
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle'
import IconButton from '@material-ui/core/IconButton'
import { TeamContext } from "../../Context/TeamContext";
import './Chart.scss'
// import mood from '../../../server/controllers/mood';


class Chart extends Component {

    constructor(){
        super();
        this.state = {
            mood: [],
            // team: [],
            // toggleShow: false
        }
    }
    

    getMood = () => {
        axios.get('/api/mood')
        .then(res => {
            this.setState({
                mood: res.data
            })
            console.log(res.data)
        })
    }

    getMembers = () => {
        axios.get('/api/team')
        .then (res => {
            this.setState({
                team: res.data
            })
        })
    }

    toggleShowFunc = () => {
        this.setState((prevState) => {
            return {
                toggleShow: !prevState.toggleShow
            }
        })
    }

    componentDidMount(){
        this.getMood()
        this.getMembers()
    }

    render(){

    const moods = this.state.mood.map((m) => m.mood)

    const moodOne = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '1' ? 1 : 0), 0)
    const moodTwo = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '2' ? 1 : 0), 0)
    const moodThree = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '3' ? 1 : 0), 0)
    const moodFour = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '4' ? 1 : 0), 0)
    const moodFive = moods.reduce((a, mood) => a+(mood.slice(0, 2) === '5' ? 1 : 0), 0)
        
    //  console.log('moods:', moodFive)

        const donutChart = {
            type: 'doughnut',
            datasets: [{
                data: [moodOne, moodTwo, moodThree, moodFour, moodFive],
                backgroundColor: ['#bf5c43', '#ee8959','#efb366', '#e9cf6a', '#babb74'],
                weight: 2
            }],
            labels: [
                '', '', '', '', ''
            ],
            
        }
        // var option = {
        //     scales: {
        //         xAxes: [{
        //            gridLines: {
        //               display: false
        //            }
        //         }],
        //         yAxes: [{
        //            gridLines: {
        //               display: false
        //            }
        //         }]
        //    }
        // }


        const lineChart = {
            
            type: 'line',
            labels: [
                // moment for prev days
            
                moment().subtract(6, 'days').format('Do'),
                moment().subtract(5, 'days').format('Do'),
                moment().subtract(4, 'days').format('Do'),
                moment().subtract(3, 'days').format('Do'),
                moment().subtract(2, 'days').format('Do'),
                moment().subtract(1, 'days').format('Do'),
                moment().format('Do')
        ],
                datasets: [{
                    label: moment().format('MMMM YYYY'),
                    pointBorderColor: '#000',
                    borderColor: '#39b8a9',
                    fill: true,
                
                    
                    pointBackgroundColor: '#e76f51',
                    pointBorderWidth: '1',
                    radius: '3',

                    data: this.state.mood.map((m) => ({x: m.date, y: m.mood})),
                    // options: option
                }],
                
            
        };

        
        return (
            <div className='chart-parent'><h1 style={{textAlign: 'center'}}>Mood History</h1>
         
                {/* <IconButton><SupervisedUserCircle style={{
                    // display: 'flex',
                    // alignItems: 'flex-start',
                    // paddingRight: '340px',
                    color: '#39b8a9'
                }} onClick={this.toggleShowFunc} id='circle-btn' className={`mem-dropdown ${this.state.toggleShow ? "show": ""}`} />
                <ul className={`${this.state.toggleShow ? "show": ""}`}>
                    <li>{this.getMembers.member_id}</li>
                    <li>member</li>
                </ul>
                </IconButton> */}
            <div className='line-chart' >
            <Line

            data={lineChart}
            width={'100%'}
            height={'100%'}
           
            />
            </div>
            
            
            <div className='mood-container'>
                <h3 className="total-moods">Total Moods</h3>
                <div className="total-moods">
                <SentimentVeryDissatisfiedIcon style={{ color:' #bf5c43'}} className="total-moods"/> {moodOne}
                <SentimentDissatisfied style={{color:'#ee8959' }} className="total-moods"/> {moodTwo}
                <SentimentSatisfiedIcon style={{color:'#efb366'}} className="total-moods"/> {moodThree}
                <SentimentSatisfiedAltIcon style={{color:'#e9cf6a'}} className="total-moods"/> {moodFour}
                <SentimentVerySatisfiedIcon style={{color:'#babb74'}} className="total-moods"/> {moodFive}
                </div>
            </div>

            <br></br>
            <div className='pie-chart' >
            <Pie
            data={donutChart}
            height={'100%'}
            width={'100%'}
            
            options={
                {
                    display: true,
                    cutoutPercentage: '60',
                    legend: {
                        display: false
                    },
                    
                }
            }/>
            </div>

            <Link to='/Main/CurrentMood'><button className='btn'
            style={{
                marginTop: '20px'
            }}>Add Mood</button></Link>
            
            {/* <Link to='/Main/Notes'><button className='btn'>View Notes</button></Link> */}


            </div>
        )
    }
}

export default Chart;