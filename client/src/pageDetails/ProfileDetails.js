import React, {useState, useEffect} from 'react';
import RatingCard from "../components/RatingCard";
import axios from 'axios';
import {makeURL} from "../utils/config";
import {useRatings} from "../context/RatingContext";
import Ratings from "../components/Ratings";

const ProfileDetails = (props) => {
  const [profile, setProfile] = useState({
    ratings: [],
    albums: []
  })

  const [ratings, setRatings] = useRatings();

  const fetchProfile = (username) => {
    axios.get(
      makeURL(`/api/profile/${username}`)
    ).then(response => {
      console.log(response.data.data);
      setProfile(response.data.data);
      setRatings(response.data.data.ratings);
    }).catch(err => {
      console.log(err.message)
    })
  }

  useEffect(() => {
    fetchProfile(props.match.params.username);
  },[])

  return (
    <div>
      <Ratings renderForm={false} meanRatings={false} renderItem={true}/>
    </div>
  )
}

export default ProfileDetails;