import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {makeURL} from "../utils/config";

const GenresPage = () => {
  const [genres, setGenres] = useState([])
  useEffect(() => {
    axios({
      method: 'get',
      url: makeURL('/api/genres')
    }).then(response => {
      console.log(response.data.data);
    }).catch(console.log);
  }, [])

  return (
    <div>
      <h1>Genres</h1>
    </div>
  )
}

export default GenresPage;