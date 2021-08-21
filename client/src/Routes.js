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
import SearchPage from './containers/SearchPage'
import ArtistsPage from "./containers/ArtistsPage";
import AlbumsPage from "./containers/AlbumsPage";
import ImportPage from "./containers/ImportPage";
import NotFoundPage from "./containers/NotFoundPage";
import GenresPage from "./containers/GenresPage";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Greetings}/>
        <Route exact path="/artists" component={ArtistsPage} key={Date.now()}/>
        <Route exact path="/albums" component={AlbumsPage}/>
        <Route exact path="/search" component={SearchPage}/>
        <Route exact path="/import" component={ImportPage}/>
        <Route path="/login" component={Login}/>
        <Route path="/genres" component={GenresPage}/>
        <Route path="/register" component={Register}/>
        <Route path="/artists/:id" component={ArtistDetails} />
        <Route path="/albums/:id" component={AlbumDetails} />
        <Route path="/profile/:username" component={ProfileDetails} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default Routes;