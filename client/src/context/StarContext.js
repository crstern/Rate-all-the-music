import React, {createContext, useContext, useState} from "react";

export const StarsContext = createContext();

export const useStars = () => useContext(StarsContext);

export const StarsProvider = (props) => {
  const [stars, setStars] = useState(0);

  return (
    <StarsContext.Provider value={[stars, setStars]}>
      {props.children}
    </StarsContext.Provider>
  )
}