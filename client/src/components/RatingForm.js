import React, {useState, useEffect} from 'react';
import {cookies} from "../utils/util";
import {makeURL} from "../utils/config";
import axios from 'axios';
import RatingCard from "./RatingCard";
import {useRatings} from "../context/RatingContext";
import Star from '../components/Star';
import StarsRating from "./StarsRating";
import {StarsProvider, useStars} from "../context/StarContext";


const RatingForm = (props) => {
  const prevRating = props.update === true ? props.rating : null;
  const [ratingStars, setRatingStars] = useStars();
  const [ratingTitle, setRatingTitle] = useState(prevRating ?
    prevRating.title : "");
  const [ratingDescription, setRatingDescription] = useState(prevRating ?
    prevRating.description : "");

  const [ratings, setRatings] = useRatings();

  useEffect(() => {
    if(prevRating)
      setRatingStars(prevRating.number_of_stars);
  }, [])

  const handleSubmitRating = (e) => {
    e.preventDefault()
    const httpMethod = props.update === true ? "put" : "post";
    const apiUrl = props.update === true ?
      makeURL(`/api/ratings/${prevRating.id}`) :
      makeURL(`/api/ratings/${props.route}/${props.id}`)

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
      if (props.update)
        auxRatings[props.index] = response.data.data;
      else auxRatings.push(response.data.data);
      setRatings(auxRatings);
    }).catch(console.log)
  }

  const handleChange = (setter, event) => {
    setter(event.target.value);
  }

  return (
    <form onSubmit={handleSubmitRating}>
      <label>Stars:</label><br/>
      <StarsRating/>
      <br/>
      <label>Title</label><br/>
      <input type={"text"} value={ratingTitle}
             onChange={(e) => handleChange(setRatingTitle, e)}/><br/>
      <label>Description</label><br/>
      <input type={"text"} value={ratingDescription}
             onChange={(e) => handleChange(setRatingDescription, e)}/><br/>
      <input type="submit" value="Submit"/>
    </form>
  )
}

export default RatingForm;