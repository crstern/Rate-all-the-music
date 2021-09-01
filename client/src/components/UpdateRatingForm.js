import React, {useState, useEffect} from 'react';
import {cookies} from "../utils/util";
import {makeURL} from "../utils/config";
import axios from 'axios';
import {useRatings} from "../context/RatingContext";
import StarsRating from "./StarsRating";
import {useStars} from "../context/StarContext";
import "./RatingForm.css";


const RatingForm = (props) => {
  const prevRating = props.rating;
  const [ratingStars, setRatingStars] = useStars();
  const [ratingTitle, setRatingTitle] = useState(prevRating.title);
  const [ratingDescription, setRatingDescription] = useState(prevRating.description);

  const [ratings, setRatings] = useRatings();

  useEffect(() => {
    if(prevRating)
      setRatingStars(prevRating.number_of_stars);
  }, [])

  const handleSubmitRating = (e) => {
    e.preventDefault()
    const httpMethod = "put"
    const apiUrl = makeURL(`/api/ratings/${prevRating.id}`);

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
      auxRatings[props.index] = response.data.data;
      setRatings(auxRatings);
    }).catch(console.log)
  }

  const handleChange = (setter, event) => {
    setter(event.target.value);
  }

  return (
    <form className="form-container" onSubmit={handleSubmitRating}>
      <StarsRating/>
      <label className="title">Title</label>
      <input className="rating-input" type={"text"} value={ratingTitle}
             onChange={(e) => handleChange(setRatingTitle, e)}/>
      <label className="description">Description</label>
      <textarea rows="3" cols="50" type={"text"} value={ratingDescription}
                onChange={(e) => handleChange(setRatingDescription, e)}/>
      <input className="submit" type="submit" value="Submit"/>
    </form>
  )
}

export default RatingForm;