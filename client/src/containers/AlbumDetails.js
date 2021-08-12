import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {getUrlFor} from '../utils/util';



const AlbumDetails = ({match}) => {
  useEffect(() => {
    fetchItem(match.params.id);
  }, [])

  const [album, setAlbum] = useState({
    image: {},
    artist: {},
  });
  const [otherAlbums, setOtherAlbums] = useState([])

  const fetchItem = async (artistId) => {
    const fetched = await fetch(makeURL(`/api/albums/${artistId}`));
    const data = await fetched.json();
    console.log(data)
    setAlbum(data.data);
    setOtherAlbums(data.data.other_albums.map(item => (
      <li key={item.name}>
        <img src={makeURL("/api/images/" + item.image.filename)} alt={item.name + " cover"}/>
        <Link to={`/albums/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>
      </li>
    )));
  }
  return (
    <div>
      <Link to={`/artists/${album.artist.id}`}>
        <h1>{album.artist.name}</h1>
      </Link>

      <h1>{album.name}</h1>
      <img src={makeURL(`/api/images/${album.image.filename}`)}/>
      <div>
        {album.description}
      </div>
      <div>
        {otherAlbums}
      </div>
    </div>
  )
}

export default AlbumDetails;