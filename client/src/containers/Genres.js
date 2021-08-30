import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useGenres} from "../context/GenreContext";
import './Genres.css';
import ScrollToTop from '../components/ScrollToTop';

const Genres = () => {
  const [genres, setGenres] = useGenres();
  const [renderGenres, setRenderGenres] = useState(null);

  useEffect(() => {
    extractGenres(genres);
  }, [genres]);


  const extractGenres = (data) => {
    setRenderGenres(data.map(item => {
      if (item.name !== "") return (
      <div key={item.name}>
        <Link to={`/genres/${item.name}`}>
          <div className="genres-item" style={{
            background: item.image, }} >
            <h3>{item.name}</h3>
          </div>
        </Link>
      </div>
    )}))
  }

  return (
    
      <div className="genres-wraper">
        {renderGenres}
      <ScrollToTop/>
      </div>
    
  )
}

export default Genres