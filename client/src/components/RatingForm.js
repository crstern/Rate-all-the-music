import React, {useState, useEffect} from 'react';
import {cookies} from "../utils/util";
import {makeURL} from "../utils/config";
import axios from 'axios';
import RatingCard from "./RatingCard";
import {useRatings} from "../context/RatingContext";
import Star from '../components/Star';
import StarsRating from "./StarsRating";
import {StarsProvider, useStars} from "../context/StarContext";
// import "./RatingForm.css";


const RatingForm = (props) => {
  const [ratingStars, setRatingStars] = useStars();
  const [ratingTitle, setRatingTitle] = useState("");
  const [ratingDescription, setRatingDescription] = useState("");

  const [ratings, setRatings] = useRatings();


  const handleSubmitRating = (e) => {
    e.preventDefault()
    const httpMethod = "post"
    const apiUrl = makeURL(`/api/ratings/${props.route}/${props.id}`)


    axios({
      method: httpMethod,
      data: {
        number_of_stars: ratingStars,
        title: ratingTitle,
        description: ratingDescription
      },
      headers: {
        'x-access-token': cookies.get('access_token')
      },
      url: apiUrl
    }).then(response => {
      const auxRatings = [...ratings]
      auxRatings.push(response.data.data);
      setRatings(auxRatings);
    }).catch(console.log)
  }

  const handleChange = (setter, event) => {
    setter(event.target.value);

  }

  return (
    <div className="form-layout-submit">
      <div className="form-wraper-submit">
        <form className="form-container-submit" onSubmit={handleSubmitRating}>
          <StarsRating/>
          <label className="title">Title</label>
          <input className="rating-input" type={"text"} value={ratingTitle}
                onChange={(e) => handleChange(setRatingTitle, e)}/>
          <label className="description">Description</label>
          <textarea rows="3" cols="50" type={"text"} value={ratingDescription}
                onChange={(e) => handleChange(setRatingDescription, e)}/>
          <input className="submit" type="submit" value="Submit"/>
        </form>
      </div>
    </div>
  )
}

export default RatingForm;