import { Switch, Route} from "react-router-dom";
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import Main from './Components/Main/Main';
import Chat from './Components/Chat/Chat'
import CurrentMood from './Components/CurrentMood/CurrentMood'
import Breadcrumbs from './Components/Breadcrumbs/Breadcrumbs';
import Home from './Components/Home'
import Team from './Components/Team/Team'

const Routes = (props) =>{
   return(
      <>
         <Breadcrumbs />
         <Switch>
            <Route exact path='/' component={Home}/>
            <Route path="/Register" component={Register} render={props => <Register {...props} />}/>
            <Route path="/Login" component={Login} render={props => <Login {...props} />}/>
            <Route path="/Main" component={Main} render={props => <Main {...props} />}/>
            <Route path="/Chat/:room?" component={Chat}/>
            <Route path="/CurrentMood" component={CurrentMood}/>
            <Route path="/Team" component={Team}/>
         </Switch>
      </>
   )
}
export default Routes;