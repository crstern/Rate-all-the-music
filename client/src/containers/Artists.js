import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {scrollToTop} from "../utils/util";
import {useArtists} from "../context/ArtistContext";
import './Artists.css';


const Artists = () => {
  const [renderArtists, setRenderArtists] = useState(null);

  const [artists, setArtists] = useArtists();

  const extractArtists = (data) => {
    setRenderArtists(data.map(item => (
      <div key={item.id} className="artist">
          <Link to={`/artists/${item.id}`}>
          <img src={makeURL("/api/images/" + item.image)} alt={item.name + " picture"}/>
          <h1>{item.name}</h1>
          <Link />
      </div>
    )));
  };

  useEffect(() => {
    extractArtists(artists)
  },[artists]);

  return (
    <div>

      <h3></h3>
      <div className="artists-wraper">
        {renderArtists &&
        <div className="artists-container">{renderArtists}</div>
        }
      </div>
    </div>
  )
}

export default Artists