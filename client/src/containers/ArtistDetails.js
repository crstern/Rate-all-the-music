import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {getUrlFor} from '../utils/util';
import axios from 'axios';
import Ratings from "../components/Ratings";
import {useRatings} from "../context/RatingContext";


const ArtistDetails = ({match}) => {
  useEffect(() => {
    fetchItem(match.params.id);
  }, [])

  const [artist, setArtist] = useState({
    image: {},
    genre: {},
  });

  const [albums, setAlbums] = useState([]);
  const [ratings, setRatings] = useRatings();
  const [error, setError] = useState(null);

  const fetchItem = (artistId) => {
    axios({
      method:'get',
      url: makeURL(`/api/artists/${artistId}`)
    }).then(response => {
      const data = response.data.data;
      console.log(response);
      setArtist(data);
      setAlbums(data.albums.map(item => (
        <li key={item.name}>
          <Link to={`/albums/${item.id}`}>
            <img src={makeURL(`/api/images/${item.image}`)} alt={item.name + " cover"}/>
            <h3>{item.name}</h3>
          </Link>
        </li>
      )));
      setRatings(data.ratings);
    }).catch(err => {
      setError(err.response.data);
    });
  }
  return (
    <div>
      {error &&
        <div>{error}</div>
      }
      {!error &&
        <div>
        <h1>{artist.name}</h1>
          <p>{artist.origin_country}</p>
          <img src={makeURL(`/api/images/${artist.image}`)}/>
          <div>
          {artist.description}
            </div>
            <Ratings id={artist.id} route={"artist"} renderForm={true} meanRatings={true} renderItem={false}/>
            <div>{albums}</div>
            <p>{artist.formed_year}</p>
            <p>{artist.genre.name}</p>

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
        </div>
    }
    </div>
  )
}

export default ArtistDetails;