import { Switch, Route} from "react-router-dom";
import Auth from './Components/Auth/Auth';
import Login from './Components/Auth/Login'

const Routes = (props) =>{
   return(

      <Switch>
         <Route path="/Auth" component={Auth}/>
         <Route path="/Login" component={Login}/>
      </Switch>
   )
   }
export default Routes;