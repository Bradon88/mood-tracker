import { Switch, Route} from "react-router-dom";
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login'
import Main from './Components/Main/Main'

const Routes = (props) =>{
   return(

      <Switch>
         <Route path="/Register" component={Register}/>
         <Route path="/Login" component={Login}/>
         <Route path="/Main" component={Main}/>
      </Switch>
   )
   }
export default Routes;