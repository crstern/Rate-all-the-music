import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {makeURL} from "../utils/config";
import Genres from "../containers/Genres";
import {useGenres} from "../context/GenreContext";


const GenresPage = () => {
  const [genres, setGenres] = useGenres();
  useEffect(() => {
    axios({
      method: 'get',
      url: makeURL('/api/genres')
    }).then(response => {
      console.log(response.data.data);
      setGenres(response.data.data);
    }).catch(console.log);
  }, [])

  return (
    <div>
      <h1>Genres</h1>
      <Genres/>
      <div className="quote"><p>Choose your genres</p></div>
    </div>
  )
}

export default GenresPage;