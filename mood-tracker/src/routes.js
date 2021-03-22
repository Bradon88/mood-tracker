import { Switch, Route} from "react-router-dom";
import Auth from './Components/Auth/Auth';
import Login from './Components/Auth/Login';
import Main from './Components/Main/Main';
import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs';

const Routes = (props) =>{
   return(
      <>
         <Breadcrumbs />
         <Switch>
            <Route path="/Auth" component={Auth} render={props => <Register {...props} />}/>
            <Route path="/Login" component={Login} render={props => <Login {...props} />}/>
            <Route path="/Main" component={Main} render={props => <Main {...props} />}/>
         </Switch>
      </>
   )
   }
export default Routes;