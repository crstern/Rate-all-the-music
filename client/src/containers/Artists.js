import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {scrollToTop} from "../utils/util";
import {useArtists} from "../context/ArtistContext";


const Artists = () => {
  const [renderArtists, setRenderArtists] = useState(null);

  const [artists, setArtists] = useArtists();

  const extractArtists = (data) => {
    setRenderArtists(data.map(item => (
      <li key={item.id}>
          <img src={makeURL("/api/images/" + item.image.filename)} alt={item.name + " picture"}/>
        <Link to={`/artists/${item.id}`}>
          <h1>{item.name}</h1>
        </Link>
      </li>
    )));
  };

  useEffect(() => {
    extractArtists(artists)
  },[artists]);

  return (
    <div>
      <ul>
        {renderArtists &&
        <div>{renderArtists}</div>
        }
      </ul>
    </div>
  )
}

export default Artists