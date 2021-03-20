import { Switch, Route} from "react-router-dom";
import Auth from './Components/Auth/Auth';
import Login from './Components/Auth/Login'
import Main from './Components/Main/Main'

const Routes = (props) =>{
   return(

      <Switch>
         <Route path="/Auth" component={Auth}/>
         <Route path="/Login" component={Login}/>
         <Route path="/Main" component={Main}/>
      </Switch>
   )
   }
export default Routes;