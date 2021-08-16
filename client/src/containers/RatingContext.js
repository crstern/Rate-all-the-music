import React, {createContext, useContext, useState, useEffect} from "react"
import axios from "axios";



export const RatingContext = createContext();

export const useRating = () => useContext(RatingContext);

export const RatingProvider = (props) => {
  const [ratings, setRatings] = useState([]);

  return (
    <RatingContext.Provider value={[ratings, setRatings]}>
      {props.children}
    </RatingContext.Provider>
  )
}