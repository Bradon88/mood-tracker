import React from 'react';
import {useHistory} from "react-router-dom";
import { Switch, Route, Redirect} from "react-router-dom";
import Chat from '../Chat/Chat';
import CurrentMood from '../CurrentMood/CurrentMood'
import Team from '../Team/Team'
import Notes from '../Notes/Notes'
import AddNotes from '../Notes/AddNotes'
import Chart from '../Chart/Chart'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs'



const Main = (props) => {
   useHistory() 

   return (
      <div>
      <Breadcrumbs />
         <Switch>
            <Route exact path="/Main/Chart" component={Chart}/>
            <Route exact path="/Main/Chat/:room?" component={Chat}/>
            <Route exact path="/Main/CurrentMood" component={CurrentMood}/>
            <Route exact path="/Main/Team" component={Team}/>
            <Route exact path='/Main/Notes' component={Notes}/>
            <Route exact path='/Main/AddNotes' component={AddNotes}/>
            <Redirect to={{pathname: "/Main/Chart"}}/>
         </Switch>
      </div>
   )

}

export default Main;



