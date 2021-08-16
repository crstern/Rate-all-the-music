import React, {useState, useEffect} from 'react';
import {cookies} from "../utils/util";
import {makeURL} from "../utils/config";
import {useUser} from "../containers/UserContext";
import RatingCard from "./RatingCard";
import RatingForm from "../components/RatingForm"
import axios from 'axios';
import {useRating} from "../containers/RatingContext";


const Ratings = (props) => {
  const[user, setUser] = useUser();

  const [ratings, setRatings] = useRating();
  const [renderRatings, setRenderRatings] = useState(null);

  useEffect(()=> {
      extractRatings(ratings);
    }
  ,[ratings]);

  function extractRatings(data) {
    console.log(data)
    setRenderRatings(data.map(item => (
      <div key={item.id}>
        <br/>
        <RatingCard rating={item}/>
        <br/>
      </div>
    )))
  }

  return (<div>
    <div>
      {renderRatings &&
      <div>
        {renderRatings}
      </div>
      }
    </div>
    <br/>
    {user &&
    <RatingForm route={props.route} id={props.id} update={false}/>
    }
  </div>)
}

export default Ratings;