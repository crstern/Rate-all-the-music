import React, {useContext, useEffect, useState} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import {useAlbums} from "../context/AlbumContext";

const Albums = () => {
  const [albums, setAlbums] = useAlbums();
  const [renderAlbums, setRenderAlbums] = useState(null);

  const extractAlbums = (data) => {
    setRenderAlbums(data.map(item => (
      <li key={item.name}>
        <img src={makeURL("/api/images/" + item.image.filename)} alt={item.name + " cover"}/>
        <Link to={`/albums/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>
      </li>
    )));
  };

  useEffect(() => {
    extractAlbums(albums)
  },[albums]);

  return (
    <div>
      <ul>
        {renderAlbums &&
          <div>{renderAlbums}</div>
        }
      </ul>
    </div>
  )
}

export default Albums;