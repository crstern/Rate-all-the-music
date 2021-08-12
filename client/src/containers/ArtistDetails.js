import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {getUrlFor} from '../utils/util';



const ArtistDetails = ({match}) => {
  useEffect(() => {
    fetchItem(match.params.id);
  }, [])

  const [artist, setArtist] = useState({
    image: {},
    genre: {},
    ratings: []
  });

  const [albums, setAlbums] = useState([])

  const fetchItem = async (artistId) => {
    const fetched = await fetch(makeURL(`/api/artists/${artistId}`));
    const data = await fetched.json();
    setArtist(data.data);
    console.log(data.data);
    setAlbums(data.data.albums.map(item => (
      <li key={item.name}>
        <img src={makeURL(`/api/images/${item.image.filename}`)} alt={item.name + " cover"}/>
        <Link to={`/albums/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>
      </li>
    )))
  }
  return (
    <div>
      <h1>{artist.name}</h1>
      <p>{artist.origin_country}</p>
      <img src={makeURL(`/api/images/${artist.image.filename}`)}/>
      {albums}
      <p>{artist.formed_year}</p>
      <p>{artist.genre.name}</p>
      <div>
        {artist.description}
      </div>
      {artist.facebook_link &&
        <p>
          <a href={getUrlFor(artist.facebook_link)}>Facebook</a>
        </p>
      }
      {artist.website &&
      <p>
        <a href={getUrlFor(artist.website)}>{artist.website}</a>
      </p>
      }
      <div>
        {artist.ratings}
      </div>
    </div>
  )
}

export default ArtistDetails;