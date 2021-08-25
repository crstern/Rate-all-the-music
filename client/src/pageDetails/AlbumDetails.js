import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Ratings from "../components/Ratings";
import {scrollToTop} from "../utils/util";
import {useRatings} from "../context/RatingContext";

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
        <li key={item.name}>
          <Link to={`/albums/${item.id}`}>
            <img src={makeURL("/api/images/" + item.image)}
                 alt={item.name + " cover"}/>
          </Link>
          <h3>{item.name}</h3>
        </li>
      )));
      setRatings(data.ratings);
      console.log(data);
    }).catch(err => {
      setError(err.response.data);
    })

  }


  return (
    <div>
      {error &&
      <div>{error}</div>
      }
      {!error && album &&
      <div>
        <Link to={`/artists/${album.artist.id}`}>
          <h1>{album.artist.name}</h1>
        </Link>

        <h1>{album.name}</h1>
        <img src={makeURL(`/api/images/${album.image}`)}/>
        <div>
          {album.description}
        </div>
        <div>
          <p>{album.total_note}/5</p>
        </div>
        <p>Main genre: <Link to={`/genres/${album.genre.name}`} >{album.genre.name}</Link></p>
        <br/>
        <Ratings id={album.id} route={"album"} renderForm={true} renderItem={false} meanRatings={true}/>
        <br/>
        <div>
          {otherAlbums}
        </div>
      </div>
      }
    </div>
  )
}

export default AlbumDetails;