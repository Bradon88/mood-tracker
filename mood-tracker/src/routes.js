import { Switch, Route} from "react-router-dom";
import Auth from './Components/Auth/Auth';

const Routes = (props) =>{
   return(

      <Switch>
         <Route path="/Auth" component={Auth}/>
      </Switch>
   )
   }
export default Routes;