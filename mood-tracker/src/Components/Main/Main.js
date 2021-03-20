import React, {useState, useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import {useHistory, Switch, Route, Redirect} from "react-router-dom";




const Main = (props) => {
   const {push} = useHistory() 

   return (
      <div>
         This is the main component
      </div>
   )

}

export default Main;



