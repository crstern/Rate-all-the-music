import React, {useEffect, useState} from 'react';
import {useUser} from "../containers/UserContext";
import axios from 'axios';
import {makeURL} from "../utils/config";
import {cookies} from "../utils/util";
import RatingForm from "./RatingForm";
import {useRating} from "../containers/RatingContext";


const RatingCard = ({rating}) => {
  const [user, setUser] = useUser();
  const [updating, setUpdating] = useState(false);
  const [ratings, setRatings] = useRating();


  const handleDeleteRating = (event) => {
    axios({
      method:"delete",
      url: makeURL(`/api/ratings/${rating.id}`),
      headers: {
        'x-access-token': cookies.get('access_token')
      }
    }).then(response => {
      console.log(response)
      setRatings(response.data.data)
    }).catch(console.log)
  }

  useEffect(() => {
    setUpdating(false);
  }, [ratings])

  return (<div>
    {updating===false &&
      <div>
        <p>{rating.number_of_stars}</p>
        <h2>{rating.title}</h2>
        <p>{rating.description}</p>
      </div>
    }
    {user.id == rating.user_id &&
      <div>
        {updating &&
        <div>
         <RatingForm method={"put"} rating={rating} update={true}/>
          <button onClick={() => setUpdating(false)}>Cancel</button>
        </div>
        }
      <button onClick={handleDeleteRating}>Delete</button>
        {updating === false &&
          <button onClick={() => setUpdating(true)}>Update</button>
        }

      </div>
    }
    </div>);
}

export default RatingCard;