import React, {useState, useEffect} from 'react';
import {cookies} from "../utils/util";
import {makeURL} from "../utils/config";
import axios from 'axios';
import RatingCard from "./RatingCard";
import {useRatings} from "../context/RatingContext";


const RatingForm = (props) => {
  const prevRating = props.update === true ? props.rating : null;

  const [ratingStars, setRatingStars] = useState(prevRating ?
    prevRating.number_of_stars : 1)
  const [ratingTitle, setRatingTitle] = useState(prevRating ?
    prevRating.title : "");
  const [ratingDescription, setRatingDescription] = useState(prevRating ?
    prevRating.description : "");

  const [ratings, setRatings] = useRatings();

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
      let auxRatings
      if(props.update === true) {
        auxRatings = ratings.filter(item => item.id !== prevRating.id);
      }
      else {
        auxRatings = [...ratings];
      }
      auxRatings.push(response.data.data)
      setRatings(auxRatings);
    }).catch(console.log)
  }

  const handleChangeStars = (event) => {
    setRatingStars(event.target.value);
  }

  const handleChangeTitle = (event) => {
    setRatingTitle(event.target.value);
  }

  const handleChangeDescription = (event) => {
    setRatingDescription(event.target.value);
  }

  return (
    <form onSubmit={handleSubmitRating}>
      <label>Stars:</label><br/>
      <input type={"number"} value={ratingStars} onChange={handleChangeStars}/><br/>
      <label>Title</label><br/>
      <input type={"text"} value={ratingTitle} onChange={handleChangeTitle}/><br/>
      <label>Description</label><br/>
      <input type={"text"} value={ratingDescription} onChange={handleChangeDescription}/><br/>
      <input type="submit" value="Submit"/>
    </form>
  )
}

export default RatingForm;