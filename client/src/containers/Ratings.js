import React, {useState, useEffect} from 'react';
import {cookies} from "../utils/util";
import {makeURL} from "../utils/config";
import {useUser} from "../context/UserContext";
import RatingCard from "../components/RatingCard";
import RatingForm from "../components/RatingForm"
import axios from 'axios';
import {useRatings} from "../context/RatingContext";
import {StarsProvider} from "../context/StarContext";


const Ratings = (props) => {
  const[user, setUser] = useUser();
  const [ratingArraySize, setRatingArraySize] = useState(3);
  const [ratings, setRatings] = useRatings();
  const [renderRatings, setRenderRatings] = useState(null);

  useEffect(()=> {
      extractRatings(ratings, ratingArraySize);
    }
  ,[ratings, ratingArraySize]);


  function extractRatings(data, size) {
    setRenderRatings(data.slice(0, size).map(item => (
      <div key={item.id}>
        <br/>
        <StarsProvider>
          <RatingCard rating={item} index={data.indexOf(item)} renderItem={props.renderItem}/>
        </StarsProvider>
        <br/>
      </div>
    )))
  }

  function handleReadMoreRatings() {
    setRatingArraySize(ratings.length)
  }

  function handleReadLessRatings() {
    setRatingArraySize(3)
  }

  return (<div>
    <div>
      {renderRatings &&
      <div>
        {renderRatings}
      </div>
      }
    </div>
    {ratings.length > 3 && ratingArraySize === 3 &&
    <button className={"button button-show"} onClick={handleReadMoreRatings}>Show more ratings</button>
    }
    {ratings.length > 3 && ratingArraySize > 3 &&
    <button className={"button button-show"} onClick={handleReadLessRatings}>Show less ratings</button>
    }
    <br/>
    {user && props.renderForm &&
      <StarsProvider>
        <RatingForm route={props.route} id={props.id} update={false}/>
      </StarsProvider>
    }
  </div>)
}

export default Ratings;