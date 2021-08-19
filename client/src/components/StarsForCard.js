import React, {useState, useEffect} from 'react';

const StarsForCard = ({stars}) => {
  const starClassInactive = "rating__star far fa-star";
  const starClassActive = "rating__star fas fa-star";
  const starClassNames = [];
  console.log(stars)
  for(let i = 0; i < stars; i++)
    starClassNames.push(starClassActive);

  for(let i = stars; i < 5;i++)
    starClassNames.push(starClassInactive);


  const renderStars = [];
  for (let i = 0;i < 5;i++)
    renderStars.push(<i key={i}
                        className={starClassNames[i]}/>);

  return <div>{renderStars}</div>
}

export default StarsForCard