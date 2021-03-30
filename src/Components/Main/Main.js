import React from 'react';
import {useHistory} from "react-router-dom";
import Chart from '../Chart/Chart'



const Main = (props) => {
   useHistory() 

   return (
      <div>
      <Chart/>
      </div>
   )

}

export default Main;



