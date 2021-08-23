import React, {useState, useEffect} from 'react';
import {cookies} from "../utils/util";
import {makeURL} from "../utils/config";
import {useUser} from "../context/UserContext";
import RatingCard from "./RatingCard";
import RatingForm from "../components/RatingForm"
import axios from 'axios';
import {useRatings} from "../context/RatingContext";
import {StarsProvider} from "../context/StarContext";


const Ratings = (props) => {
  const[user, setUser] = useUser();

  const [ratings, setRatings] = useRatings();
  const [renderRatings, setRenderRatings] = useState(null);
  const [ratingsMean, setRatingsMean] = useState(0);

  useEffect(()=> {
      extractRatings(ratings);
      setRatingsMean(calculateRatingsMean(ratings));
    }
  ,[ratings]);

  function calculateRatingsMean(ratings) {
    let result = 0;
    for (const rating of ratings){
      result += rating.number_of_stars;
    }
    return result / ratings.length;
  }

  function extractRatings(data) {
    console.log(props.renderItem)
    setRenderRatings(data.map(item => (
      <div key={item.id}>
        <br/>
        <StarsProvider>
          <RatingCard rating={item} index={data.indexOf(item)} renderItem={props.renderItem}/>
        </StarsProvider>
        <br/>
      </div>
    )))
  }

  return (<div>
    <div>
      {props.meanRatings === true && ratingsMean > 0 &&
      <h3>Rating mean: {ratingsMean}</h3>
      }
      {renderRatings &&
      <div>
        {renderRatings}
      </div>
      }
    </div>
    <br/>
    {user && props.renderForm &&
      <StarsProvider>
        <RatingForm route={props.route} id={props.id} update={false}/>
      </StarsProvider>
    }
  </div>)
}

export default Ratings;