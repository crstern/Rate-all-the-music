import React, {useContext, useEffect, useState} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import {useAlbums} from "../context/AlbumContext";
import './Albums.css';

const Albums = () => {
  const [albums, setAlbums] = useAlbums();
  const [renderAlbums, setRenderAlbums] = useState(null);

  const extractAlbums = (data) => {
    setRenderAlbums(data.map(item => (
      <div key={item.name} className="album">
        <Link to={`/albums/${item.id}`}>
          <img src={makeURL("/api/images/" + item.image)} alt={item.name + " cover"}/>
          <h3>{item.name}</h3>
        </Link>
        <h3>{item.name}</h3>
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
    </div>
  )
}

export default Albums;