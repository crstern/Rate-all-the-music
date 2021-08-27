import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Ratings from "../components/Ratings";
import {scrollToTop} from "../utils/util";
import {useRatings} from "../context/RatingContext";
import "./AlbumDetails.css";

const AlbumDetails = ({match}) => {
  useEffect(() => {
    fetchItem(match.params.id);
    scrollToTop();
  }, [match])

  const [album, setAlbum] = useState(null);
  const [error, setError] = useState(null);
  const [otherAlbums, setOtherAlbums] = useState([])
  const [ratings, setRatings] = useRatings()

  const fetchItem = (albumId) => {
    axios({
      method: 'get',
      url: makeURL(`/api/albums/${albumId}`)
    }).then(response => {
      const data = response.data.data;
      setAlbum(data);

      setOtherAlbums(data.other_albums.map(item => (
        <div className="albums" key={item.name}>
          <Link to={`/albums/${item.id}`}>
            <img className="album-images" src={makeURL("/api/images/" + item.image)}
                 onError={(e)=>{e.target.onerror = null; e.target.src=makeURL(`/api/images/default_album.png`)}}/>
          </Link>
          <h3>{item.name}</h3>
        </div>
      )));
      setRatings(data.ratings);
      console.log(data);
    }).catch(err => {
      setError(err.response.data);
    })

  }


  return (
    <div className="layout-container">
      {error &&
      <div>{error}</div>
      }
      {!error && album &&
      <div className="container">
        
          <Link to={`/artists/${album.artist.id}`}>
            <h1>{album.artist.name}</h1>
          </Link>

          <h1>{album.name}</h1>

          <div className="img-description">
            <div className="image">
              <img className="album-image-main" src={makeURL(`/api/images/${album.image}`)} alt={album.name + " cover"}
                   onError={(e)=>{e.target.onerror = null; e.target.src=makeURL(`/api/images/default_album.png`)}}/>
              <div className="social-media">
                <div className="year-name-facebook">
                  <p>{album.total_note.toFixed(2)}/5</p>
                  <p><Link to={`/genres/${album.genre.name}`} >{album.genre.name}</Link></p>
                </div>
                <p>Release year: {album.release_year ? album.release_year : "Unknown"}</p>

              </div>
            </div>
            
            <div className="description">
              {album.description}
            </div>
          </div>

          <Ratings id={album.id} route={"album"} renderForm={true} renderItem={false} meanRatings={true}/>
          <br/>
          <div className="album-wraper">
            {otherAlbums}
          </div>
        
      </div>
      }
    </div>
  )
}

export default AlbumDetails;