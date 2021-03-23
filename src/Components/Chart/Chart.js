import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import {Link} from 'react-router-dom';
import moment from 'moment'
import './Chart.scss'

class Chart extends Component {
    render(){

        const donutChart = {
            type: 'doughnut',
            datasets: [{
                data: [10,20,30],
                backgroundColor: ['#e76f51', '#e9c46a']
            }],
            labels: [
                'Red', 'Yellow', 'Blue'
            ]
        }


        const lineChart = {
            
            type: 'line',
            labels: ['1', '2', '3', '4', '5'],
                datasets: [{
                    label: moment().format('MMMM YYYY'),
                    pointBorderColor: '#000',
                    borderColor: '#2a9d8f',
                    fill: false,
                    
                    // pointBackgroundColor: '#e76f51',
                    pointBorderWidth: '1',
                    radius: '6',
                    data: [4, 3, 2, 5, 1]
                }],
            
        };
        return (
            <div><h1 style={{textAlign: 'center'}}>Moods on Display</h1>
            <Line

            data={lineChart}
            width={200}
            // height={300} for responsive/mobile design
            options={{
            
            legend: {
                display: true
            }
            }}/>
            <Pie
            data={donutChart}
            height={150}
            options={
                {
                    display: true,
                    cutoutPercentage: '60'
                }
            }/>

            <button className="btn"
            style={{
                marginTop: '20px'
            }}><Link to='/CurrentMood'>Add Mood</Link></button>
            </div>
        )
    }
}

export default Chart;