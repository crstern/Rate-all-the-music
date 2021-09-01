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

  const [artist, setArtist] = useState();

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
            <img className="album-images" src={makeURL(`/api/images/${item.image}`)} alt={item.name + " cover"}
                 onError={(e)=>{e.target.onerror = null; e.target.src=makeURL(`/api/images/default_album.png`)}}/>
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
    <div className="layout-container">
      {error &&
        <div>{error}</div>
      }
      {!error && artist &&
        <div className="container">
        <h1>{artist.name}</h1>
        <div className="country-wraper"><p className="country">{artist.origin_country}</p></div>
          
          <div className="img-description">
            <div className="image">
              <img className="artist-image" src={makeURL(`/api/images/${artist.image}`)}
                onError={(e)=>{e.target.onerror = null; e.target.src=makeURL(`/api/images/default_artist.jpg`)}}/>
              <div className="social-media">
                <div className="year-name-facebook">
                <p>{artist.formed_year}</p>
                <p><Link to={`/genres/${artist.genre.name}`} >{artist.genre.name}</Link></p>
            
                {artist.facebook_link &&
                  <p>
                    <a className="fa fa-facebook" href={getUrlFor(artist.facebook_link)}></a>
                  </p>
                }
                </div>
                  <div className={"total-note-website"}>
                    <p>{artist.total_note.toFixed(2)}/5</p>
                    {artist.website &&
                    <a href={getUrlFor(artist.website)}>{artist.website}</a>
                    }
                  </div>
              </div>
            </div>
            <div className="description">
              {artist.description}
            </div>
          </div>
            <Ratings id={artist.id} route={"artist"} renderForm={true} renderItem={false}/>
            <div className="album-wraper">{albums}</div>
        </div>
    }
    </div>
  )
}

export default ArtistDetails;