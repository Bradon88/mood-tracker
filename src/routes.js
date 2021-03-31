import { Switch, Route, Redirect} from "react-router-dom";
import React, {useContext} from 'react';
import {AuthContext} from './Context/AuthContext'
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Main from './Components/Main/Main';
import Home from './Components/Home/Home'




const Routes = (props) =>{
   const {user} = useContext(AuthContext)

   return(
      <>
      
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/Register" component={Register} render={props => <Register {...props} />}/>
            <Route path="/Login" component={Login} render={props => <Login {...props} />}/>
            {!user ? (
               <Redirect
                  to={{
                     pathname: "/",
                  }}
               />
            ): null}
            <Route path="/Main" component={Main} render={props => <Main {...props} />}/>
            
         </Switch>
      </>
   )
}
export default Routes;