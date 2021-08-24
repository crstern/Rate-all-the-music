import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useGenres} from "../context/GenreContext";


const Genres = () => {
  const [genres, setGenres] = useGenres();
  const [renderGenres, setRenderGenres] = useState(null);

  useEffect(() => {
    extractGenres(genres);
  }, [genres]);


  const extractGenres = (data) => {
    setRenderGenres(data.map(item => {
      if (item.name !== "") return (
      <li key={item.name}>
        <div style={{
          background: item.image,
          borderRadius: '10%',
        }} >
          <Link to={`/genres/${item.name}`}>
            <h3>{item.name}</h3>
          </Link>
        </div>
      </li>
    )}))
  }

  return (
    <div>
      {renderGenres}
    </div>
  )
}

export default Genres