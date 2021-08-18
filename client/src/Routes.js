import React from 'react';
import {Route, Switch} from "react-router-dom";
import Greetings from "./containers/Greetings"
import Artists from "./containers/Artists";
import Login from "./containers/Login";
import Register from "./containers/Register";
import Albums from "./containers/Albums"
import ArtistDetails from "./containers/ArtistDetails";
import AlbumDetails from "./containers/AlbumDetails";
import ForgotUsername from "./containers/ForgotUsername";
import ForgotPassword from "./containers/ForgotPassword";
import ProfileDetails from "./containers/ProfileDetails";
import Search from './containers/Search'

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Greetings}/>
        <Route exact path="/artists" component={Artists} key={Date.now()}/>
        <Route exact path="/albums" component={Albums}/>
        <Route exact path="/search" component={Search}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/artists/:id" component={ArtistDetails} />
        <Route path="/albums/:id" component={AlbumDetails} />
        <Route path="/forgot_username" component={ForgotUsername} />
        <Route path="/forgot_password" component={ForgotPassword} />
        <Route path="/profile/:username" component={ProfileDetails} />
      </Switch>
    </div>
  );
}

export default Routes;