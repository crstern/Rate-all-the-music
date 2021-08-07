import React from 'react';
import {Route, Switch} from "react-router-dom";
import Greetings from "./containers/Greetings"
import Artists from "./containers/Artists";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Albums from "./containers/Albums"

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Greetings}/>
        <Route path="/artists" component={Artists}/>
        <Route path="/albums" component={Albums}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
    </div>
  );
}

export default Routes;