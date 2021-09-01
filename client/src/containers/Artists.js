import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {scrollToTop} from "../utils/util";
import {useArtists} from "../context/ArtistContext";
import './Artists.css';
import ScrollToTop from '../components/ScrollToTop';
import Spinner from '../components/Spinner';

const Artists = () => {
  const [renderArtists, setRenderArtists] = useState(null);

  const [artists, setArtists] = useArtists();

  const extractArtists = (data) => {
    setRenderArtists(data.map(item => (
      <div key={item.id} className="artist">
          <Link to={`/artists/${item.id}`}>
            <img src={makeURL(`/api/images/${item.image}`)}
                 onError={(e)=>{e.target.onerror = null; e.target.src=makeURL(`/api/images/default_artist.jpg`)}}/>
            <h1>{item.name}</h1>
          </Link>
      </div>
    )));
  };

  useEffect(() => {
    extractArtists(artists)
  },[artists]);

  return (
    <div>

      <div className="artists-wraper">
        
        <div className="artists-container">{renderArtists ? renderArtists : <Spinner/>}</div>
        
      </div>
      <ScrollToTop />
    </div>
  )
}

export default Artists