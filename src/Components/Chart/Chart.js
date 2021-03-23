import React, {Component} from 'react';
import {Scatter} from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import {Link} from 'react-router-dom'

class Chart extends Component {
    render(){

        const data1 = {
            type: 'doughnut',
            datasets: [{
                data: [10,20,30],
                backgroundColor: ['#e76f51', '#e9c46a']
            }],
            labels: [
                'Red', 'Yellow', 'Blue'
            ]
        }


        const data = {
            type: 'scatter',
            
                datasets: [{
                    label: 'Scatter Dataset',
                    pointBorderColor: '#000',
                    pointBackgroundColor: '#e76f51',
                    pointBorderWidth: '1',
                    radius: '6',
                   
                    data: [{
                        x: 5,
                        y: 4
                    },{
                        x:5,
                        y:2
                    }, {
                        x: 0,
                        y: 10
                    }, {
                        x: 10,
                        y: 5
                    },{
                        x: 6,
                        y:3
                    }]
                }],
            
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear',
                        position: 'bottom'
                    }]
                }
            }
        };
        return (
            <div><h1 style={{textAlign: 'center'}}>Moods on Display</h1>
            <Scatter

            data={data}
            width={500}
            // height={300} for responsive/mobile design
            options={{
             title: {
                 display:true
             },
            legend: {
                display: true
            }
            }}/>
            <Pie
            data={data1}
            height={110}
            options={
                {
                    display: true,
                    cutoutPercentage: '50'
                }
            }
            />

            <button><Link to='/CurrentMood'>Add Mood</Link></button>
            </div>
        )
    }
}

export default Chart;