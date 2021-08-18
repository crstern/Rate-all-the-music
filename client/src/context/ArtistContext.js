import React, {createContext, useContext, useState, useEffect} from "react"

export const ArtistContext = createContext();

export const useArtists = () => useContext(ArtistContext);

export const ArtistsProvider = (props) => {
  const [artists, setArtists] = useState([]);

  return (
    <ArtistContext.Provider value={[artists, setArtists]}>
      {props.children}
    </ArtistContext.Provider>
  )
}