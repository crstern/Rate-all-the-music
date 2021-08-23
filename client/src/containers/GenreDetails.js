import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {makeURL} from "../utils/config";
import Artists from "./Artists";
import {useArtists} from "../context/ArtistContext";

const GenreDetails = (props) => {
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);
  const [artists, setArtists] = useArtists();


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
      setArtists(response.data.data.artists)
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
        <Artists/>
      </div>
      }
      {error &&
      <p>{error}</p>}
    </div>
  );
}

export default GenreDetails;