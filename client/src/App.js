import React from "react";
import './App.css';
import Routes from "./Routes";
import Nav from "./components/Nav"
import {UserProvider} from "./context/UserContext";
import {RatingsProvider} from "./context/RatingContext";
import {ArtistsProvider} from "./context/ArtistContext";
import {AlbumsProvider} from "./context/AlbumContext";
import {GenresProvider} from "./context/GenreContext";

function App() {
  return (
    <div className="App">
      <RatingsProvider>
        <ArtistsProvider>
          <AlbumsProvider>
            <UserProvider>
              <GenresProvider>
                <Nav />
                <Routes/>
              </GenresProvider>
            </UserProvider>
          </AlbumsProvider>
        </ArtistsProvider>
      </RatingsProvider>
    </div>
  );
}

export default App;
