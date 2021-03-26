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
import './Chart.scss'
// import mood from '../../../server/controllers/mood';


class Chart extends Component {

    constructor(){
        super();
        this.state = {
            mood: []
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


    componentDidMount(){
        this.getMood()
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

                    data: this.state.mood.map((m) => ({x: m.date, y: m.mood}))
                
                }]
                
            
        };
        return (
            <div><h1 style={{textAlign: 'center'}}>Moods on Display</h1>
            
            <Line

            data={lineChart}
            width={200}
            />
            
            <div>
                <SentimentVeryDissatisfiedIcon style={{ color:' #bf5c43'}}/> {moodOne}
                <SentimentDissatisfied style={{color:'#ee8959' }}/> {moodTwo}
                <SentimentDissatisfied style={{color:'#efb366'}}/> {moodThree}
                <SentimentSatisfiedAltIcon style={{color:'#e9cf6a'}}/> {moodFour}
                <SentimentVerySatisfiedIcon style={{color:'#babb74'}}/> {moodFive}
            </div>

            <Pie
            data={donutChart}
            height={150}
            options={
                {
                    display: true,
                    cutoutPercentage: '60',
                    legend: {
                        display: false
                    }
                }
            }/>

            <button className="btn"
            style={{
                marginTop: '20px'
            }}><Link to='/CurrentMood'>Add Mood</Link></button>

            <Link to='/Notes' className='btn'>View Notes</Link>

            </div>
        )
    }
}

export default Chart;