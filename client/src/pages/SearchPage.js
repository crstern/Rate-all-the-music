import React, {useEffect, useState} from 'react';
import SearchForm from '../components/SearchForm';
import Artists from "../containers/Artists";
import {useArtists} from "../context/ArtistContext";
import {useAlbums} from "../context/AlbumContext";
import Albums from "../containers/Albums";
import {Link} from 'react-router-dom';

const SearchPage = () => {
  const [artists, setArtists] = useArtists();
  const [albums, setAlbums] = useAlbums();

  useEffect(() => {
    setArtists([])
    setAlbums([])
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