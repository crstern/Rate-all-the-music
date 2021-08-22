import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {makeURL} from "../utils/config";
import Genres from "./Genres";


const GenresPage = () => {
  const [genres, setGenres] = useState([])
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
      <Genres genres={genres}/>
    </div>
  )
}

export default GenresPage;