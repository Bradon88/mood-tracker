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
                data: [10,20,30, 22, 54],
                backgroundColor: ['#bf5c43', '#ee8959','#efb366', '#e9cf6a', '#babb74'],
                weight: 2
            }],
            labels: [
               'Sad', 'Bummed', 'Meh', 'Happy', 'Stoked'
            ]
        }


        const lineChart = {
            
            type: 'line',
            labels: [
                
                moment().format('Do'),
                moment().add(1, 'days').format('Do'),
                moment().add(2, 'days').format('Do'),
                moment().add(3, 'days').format('Do')
            
        ],
                datasets: [{
                    label: moment().format('MMMM YYYY'),
                    pointBorderColor: '#000',
                    pointBackgroundColor: '',
                    borderColor: '#39b8a9',
                    fill: true,
                  
                    
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
            />

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

            <button className='btn'>View Notes</button>

            </div>
        )
    }
}

export default Chart;