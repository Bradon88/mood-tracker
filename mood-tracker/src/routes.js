// import React, {useContext} from 'react';
// import { Switch, Route, Redirect} from "react-router-dom";
// import {AuthContext} from './Context/AuthContext'
// import Main from './Components/Main/Main';
// import Home from './Components/Home/Home';

// const Routes = (props) =>{
//    const {user} = useContext(AuthContext)

//    return(

//       <Switch>
//          <Route exact path="/" component={Home}/>
//          {!user ? (
//             <Redirect
//                to={{
//                   pathname: "/",
//                }}
//             />
//          ): null}
//             <Route path="/Main" component={Main}/>
            
//       </Switch>
//    )
// }

// export default Routes;