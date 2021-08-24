import React, {useEffect, useState} from 'react';
import SearchForm from '../components/SearchForm';
import Artists from "../containers/Artists";
import {useArtists} from "../context/ArtistContext";
import {useAlbums} from "../context/AlbumContext";
import Albums from "../containers/Albums";
import {Link} from 'react-router-dom';
import {useGenres} from "../context/GenreContext";
import Genres from "../containers/Genres";

const SearchPage = () => {
  const [artists, setArtists] = useArtists();
  const [albums, setAlbums] = useAlbums();
  const [genres, setGenres] = useGenres();

  useEffect(() => {
    setArtists([])
    setAlbums([])
    setGenres([])
  }, [])

  return (
    <div>
      <SearchForm />
      {artists.length > 0 &&
      <h1>Artists</h1>
      }
      <Artists />
      {albums.length > 0 &&
      <h1>Albums</h1>
      }
      <Albums />
      {genres.length > 0 &&
      <h1>Genres</h1>
      }
      <Genres />
      <div>
        <div>You can't find an artist?</div>
        <Link to={"/import"} >
          Import an artist
        </Link>
      </div>
    </div>

  )
}

export default SearchPage;