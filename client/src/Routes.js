import React from 'react';
import {Route, Switch} from "react-router-dom";
import GreetingsPage from "./pages/GreetingsPage"
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ArtistDetails from "./pageDetails/ArtistDetails";
import AlbumDetails from "./pageDetails/AlbumDetails";
import ProfileDetails from "./pageDetails/ProfileDetails";
import SearchPage from './pages/SearchPage'
import ArtistsPage from "./pages/ArtistsPage";
import AlbumsPage from "./pages/AlbumsPage";
import ImportPage from "./pages/ImportPage";
import NotFoundPage from "./pages/NotFoundPage";
import GenresPage from "./pages/GenresPage";
import UploadAll from "./pages/UploadAll";
import GenreDetails from "./pageDetails/GenreDetails";

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={GreetingsPage}/>
        <Route exact path="/artists" component={ArtistsPage} key={Date.now()}/>
        <Route exact path="/albums" component={AlbumsPage}/>
        <Route exact path="/search" component={SearchPage}/>
        <Route exact path="/import" component={ImportPage}/>
        <Route exact path="/uploadAll" component={UploadAll} />
        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/genres" component={GenresPage}/>
        <Route path="/genres/:name" component={GenreDetails} />
        <Route path="/register" component={RegisterPage}/>
        <Route path="/artists/:id" component={ArtistDetails} />
        <Route path="/albums/:id" component={AlbumDetails} />
        <Route path="/profile/:username" component={ProfileDetails} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  );
}

export default Routes;