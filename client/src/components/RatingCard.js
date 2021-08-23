import React, {useEffect, useState} from 'react';
import {useUser} from "../context/UserContext";
import axios from 'axios';
import {makeURL} from "../utils/config";
import {cookies} from "../utils/util";
import RatingForm from "./RatingForm";
import {useRatings} from "../context/RatingContext";
import StarsForCard from "./StarsForCard";
import {Link} from "react-router-dom";


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


  return (<div>
    {renderItem === true && rating.artist.image &&
    <div>
      <Link to={`/artists/${rating.artist.id}`}>
        <p>{rating.artist.name}</p>
      </Link>
      <img src={makeURL("/api/images/" + rating.artist.image)} alt={rating.artist.name + " cover"}/>
    </div>}
    {renderItem === true && rating.album.image &&
    <div>
      <Link to={`/albums/${rating.album.id}`}>
        <p>{rating.album.name}</p>
      </Link>
      <img src={makeURL("/api/images/" + rating.album.image)} alt={rating.album.name + " cover"}/>
    </div>}
    {updating===false &&
      <div>

        <StarsForCard stars={rating.number_of_stars} />
        <h2>{rating.title}</h2>
        <p>{rating.description}</p>
        <p>Likes: {numberOfLikes}</p>
      </div>
    }
    {user && user.id == rating.user_id &&
      <div>
        {updating &&
        <div>
         <RatingForm method={"put"} rating={rating} update={true} index={index}/>
          <button onClick={() => setUpdating(false)}>Cancel</button>
        </div>
        }
      <button onClick={handleDeleteRating}>Delete</button>
        {updating === false &&
          <button onClick={() => setUpdating(true)}>Update</button>
        }
      </div>
    }
    {user && liked === false &&
    <button onClick={(e) => {
      e.preventDefault();
      handleLikeButton("like");
    }}>Like</button>
    }
    {user && liked === true &&
    <button onClick={(e) => {
      e.preventDefault();
      handleLikeButton("unlike");
    }}>Unlike</button>
    }
    </div>);
}

export default RatingCard;