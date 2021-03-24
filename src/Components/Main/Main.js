import React, {useState, useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import {useHistory, Switch, Route, Redirect} from "react-router-dom";
import Chart from '../Chart/Chart'



const Main = (props) => {
   const {push} = useHistory() 

   return (
      <div>
      <Chart/>
      </div>
   )

}

export default Main;



