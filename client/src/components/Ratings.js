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

  useEffect(()=> {
      extractRatings(ratings);
    }
  ,[ratings]);

  function extractRatings(data) {
    console.log(data)
    setRenderRatings(data.map(item => (
      <div key={item.id}>
        <br/>
        <StarsProvider>
          <RatingCard rating={item}/>
        </StarsProvider>
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
    {user && props.renderForm &&
      <StarsProvider>
        <RatingForm route={props.route} id={props.id} update={false}/>
      </StarsProvider>
    }
  </div>)
}

export default Ratings;