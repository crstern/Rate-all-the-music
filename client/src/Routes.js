import React from 'react';
import {Route, Switch} from "react-router-dom";
import Greetings from "./containers/Greetings"
import Artists from "./containers/Artists";
import Login from "./containers/Login";
import Logout from "./containers/Logout";
import Register from "./containers/Register";
import Albums from "./containers/Albums"
import ArtistDetails from "./containers/ArtistDetails";
import AlbumDetails from "./containers/AlbumDetails";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Greetings}/>
        <Route exact path="/artists" component={Artists} key={Date.now()}/>
        <Route exact path="/albums" component={Albums}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/artists/:id" component={ArtistDetails} />
        <Route path="/albums/:id" component={AlbumDetails} />

      </Switch>
    </div>
  );
}

export default Routes;