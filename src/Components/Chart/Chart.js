import React, {Component} from 'react';
import {Scatter} from 'react-chartjs-2';

class Chart extends Component {
    render(){

        const data = {
            type: 'scatter',
            
                datasets: [{
                    label: 'Scatter Dataset',
                    pointBorderColor: '#e76f51',
                    pointBackGroundColor: '#e76f51',
                    data: [{
                        x: 5,
                        y: 4
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
            <div><h1>Moods on Display</h1>
            <Scatter

            data={data}
            width={400}
           
            options={{
             title: {
                 display:true
             },
            legend: {
                display: true
            }
            }}/>
            </div>
        )
    }
}

export default Chart;