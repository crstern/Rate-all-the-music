import React, {useState, useEffect} from 'react';
import Star from "./Star";
import {useStars} from "../context/StarContext";


const StarsRating = () => {

  const [stars, setStars] = useStars();
  const starClassInactive = "rating__star far fa-star";
  const starClassActive = "rating__star fas fa-star";
  const [starClassNames, setStarClassNames] = useState(
    [starClassInactive, starClassInactive, starClassInactive ,starClassInactive, starClassInactive]
  );

  useEffect(() => {
    const newStarsConfig = [...starClassNames];
    for(let i = 0; i < stars; i++)
      newStarsConfig[i] = starClassActive;

    for(let i = stars; i < 5;i++)
      newStarsConfig[i] = starClassInactive;

    setStarClassNames(newStarsConfig);
  },[stars])

  const handleClickedStar = (starNumber) => {
    setStars(starNumber + 1);
  }

  const renderStars = [];
  for (let i = 0;i < 5;i++)
    renderStars.push(<i key={i}
                        onClick={() => handleClickedStar(i)}
                        className={starClassNames[i]}/>);

  return <div>{renderStars}</div>
}

export default StarsRating;