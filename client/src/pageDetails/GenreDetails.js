import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeURL} from "../utils/config";
import Artists from "../containers/Artists";
import {useArtists} from "../context/ArtistContext";
import Albums from "../containers/Albums";
import {useAlbums} from "../context/AlbumContext";

const GenreDetails = (props) => {
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);
  const [artists, setArtists] = useArtists();
  const [albums, setAlbums] = useAlbums();


  useEffect(() => {
    extractGenreInfo(props.match.params.name);
  }, [props]);

  const extractGenreInfo = async (genreName) => {
    try{
      const response = await axios({
        method:'get',
        url: makeURL(`/api/genres/${genreName}`)
      })
      setGenre(response.data.data);
      setArtists(response.data.data.artists);
      setAlbums(response.data.data.albums);
      console.log(response.data.data);
    }
    catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div>
      {genre  &&
      <div>
        <p>{genre.name}</p>
        <h3>Artists</h3>
        <Artists/>
        <h3>Albums</h3>
        <Albums />
      </div>
      }
      {error &&
      <p>{error}</p>}
    </div>
  );
}

export default GenreDetails;