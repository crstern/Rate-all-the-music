import React, {useEffect, useState} from 'react';
import {useUser} from "../context/UserContext";
import axios from 'axios';
import {makeURL} from "../utils/config";
import {cookies} from "../utils/util";
import RatingForm from "./RatingForm";
import {useRatings} from "../context/RatingContext";
import StarsForCard from "./StarsForCard";
import {Link} from "react-router-dom";
import './RatingCard.css';
import UpdateRatingForm from "./UpdateRatingForm";


const RatingCard = ({rating, index, renderItem}) => {
  const userLikesRating = (current_user, rating) =>
    (rating.users_that_like.find(u => u.username === current_user.username) !== undefined)

  const [user, setUser] = useUser();
  const [updating, setUpdating] = useState(false);
  const [ratings, setRatings] = useRatings();
  const [numberOfLikes, setNumberOfLikes] = useState(rating.users_that_like.length);
  const [liked, setLiked] = useState(
    userLikesRating(user, rating)
  );

  const handleDeleteRating = (event) => {
    event.preventDefault()
    axios({
      method:"delete",
      url: makeURL(`/api/ratings/${rating.id}`),
      headers: {
        'x-access-token': cookies.get('access_token')
      }
    }).then(() => {
      setRatings(ratings.filter(item => item.id !== rating.id))
    }).catch(console.log)
  }

  const handleLikeButton = (like) => {
    axios({
      method:"put",
      url: makeURL(`/api/ratings/${like}/${rating.id}`),
      headers: {
        'x-access-token': cookies.get('access_token')
      },
      data: {
        username: user.username
      }
    }).then(response => {
      const newRating = response.data.data;
      const auxRatings = [...ratings]
      auxRatings[index] = newRating;
      setRatings(auxRatings);
      setNumberOfLikes(newRating.users_that_like.length);
      setLiked(userLikesRating(user, newRating));
    })
      .catch(err => {
        console.log(err.response.data)
      })
  }

  useEffect(() => {
    setUpdating(false);
  }, [ratings])

  
  return (
    <div>
      <div className="rating-card-container">
        <div className="rating-card-items">
          {updating===false &&
          <div>
            {renderItem === true && rating.artist.image &&
            <div>
              <Link to={`/artists/${rating.artist.id}`}>
                <p>{rating.artist.name}</p>
              </Link>
              <img src={makeURL(`/api/images/${rating.artist.image}`)}
                   onError={(e)=>{e.target.onerror = null; e.target.src=makeURL(`/api/images/default_artist.jpg`)}}/>
            </div>}
            {renderItem === true && rating.album.image &&
            <div>
              <Link to={`/albums/${rating.album.id}`}>
                <p>{rating.album.name}</p>
              </Link>
              <img src={makeURL("/api/images/" + rating.album.image)} alt={rating.album.name + " cover"}/>
            </div>}
            <Link to={`/profile/${rating.username}`} >
              <p className={"user"}>{rating.username}</p>
            </Link>
            <div className="stars"><StarsForCard stars={rating.number_of_stars}/></div>
            {rating.title.length > 0 &&
            <h2>{rating.title}</h2>}
            {rating.description.length > 0 &&
            <p>{rating.description}</p>}
            <p>Likes: {numberOfLikes}</p>
          </div>
          }
          <div className="buttons">
            {user && user.username === rating.username &&
            <div className="form-and-cancel">
              {updating &&
              <div>
                <UpdateRatingForm rating={rating} index={index}/>
                <button className="button cancel" onClick={() => setUpdating(false)}>Cancel</button>
              </div>
              }
              {updating === false &&
              <div>
                <button className="button" onClick={handleDeleteRating}>Delete</button>
                <button className="button" onClick={() => setUpdating(true)}>Update</button>
              </div>
              }
            </div>
            }


            {user && liked === false && updating===false &&
            <button className="button like" onClick={(e) => {
              e.preventDefault();
              handleLikeButton("like");
            }}>Like</button>

            }
            {user && liked === true && updating===false &&
            <button className="button" onClick={(e) => {
              e.preventDefault();
              handleLikeButton("unlike");
            }}>Unlike</button>
            }
          </div>
        </div>
      </div>
    </div>);
}

export default RatingCard;