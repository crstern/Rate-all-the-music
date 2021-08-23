import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {getUrlFor} from '../utils/util';
import axios from 'axios';
import Ratings from "../components/Ratings";
import {useRatings} from "../context/RatingContext";
import "./ArtistDetails.css"

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
        <div className="albums" key={item.name}>
          <Link to={`/albums/${item.id}`}>
            <img className="album-images" src={makeURL(`/api/images/${item.image}`)} alt={item.name + " cover"}/>
          </Link>
          <h3>{item.name}</h3>
        </div>
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
        <div className="container">
        <h1>{artist.name}</h1>
          <p>{artist.origin_country}</p>
          <div className="img-description">
            <div className="image">
              <img src={makeURL(`/api/images/${artist.image}`)}/>
              <div className="social-media">
                <div className="year-name-facebook">
                <p>{artist.formed_year}</p>
                <p>{artist.genre.name}</p>
            
                {artist.facebook_link &&
                  <p>
                  <a className="icon-social-facebook" href={getUrlFor(artist.facebook_link)}></a>
                  </p>
                }
                </div>
                <div className="website">
                {artist.website &&
                  <p>
                  <a href={getUrlFor(artist.website)}>{artist.website}</a>
                  </p>
                }
                </div>
              </div>
            </div>
            <div className="description">
              {artist.description}
            </div>
          </div>
            <Ratings id={artist.id} route={"artist"} renderForm={true} meanRatings={true} renderItem={false}/>
            <div className="album-wraper">{albums}</div>
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