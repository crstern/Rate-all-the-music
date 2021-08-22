import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';


const Genres = (props) => {
  const [renderGenres, setRenderGenres] = useState(null);

  useEffect(() => {
    extractGenres(props.genres);
  }, [props]);

  const extractGenres = (data) => {
    setRenderGenres(data.map(item => {
      if (item.name !== "") return (
      <li key={item.name}>
        <Link to={`/genres/${item.name}`}>
          <h3>{item.name}</h3>
        </Link>
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