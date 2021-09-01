import React, {useContext, useEffect, useState} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import {useAlbums} from "../context/AlbumContext";
import './Albums.css';
import ScrollToTop from '../components/ScrollToTop';

const Albums = () => {
  const [albums, setAlbums] = useAlbums();
  const [renderAlbums, setRenderAlbums] = useState(null);

  const extractAlbums = (data) => {
    setRenderAlbums(data.map(item => (
      <div key={item.name} className="album">
        <Link to={`/albums/${item.id}`}>
          <img src={makeURL("/api/images/" + item.image)}
               onError={(e)=>{e.target.onerror = null; e.target.src=makeURL(`/api/images/default_album.png`)}}/>
        </Link>
      </div>
    )));
  };

  useEffect(() => {
    extractAlbums(albums)
  },[albums]);

  return (
    
    <div>
      <div className="albums-wraper">
        {renderAlbums &&
          <div className="albums-container">{renderAlbums}</div>
        }
      </div>
      <ScrollToTop />
    </div>
  )
}

export default Albums;