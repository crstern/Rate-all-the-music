import React, {createContext, useContext, useState, useEffect} from "react"

export const GenreContext = createContext();

export const useGenres = () => useContext(GenreContext)

export const GenresProvider = (props) => {
  const [genres, setGenres] = useState([]);

  return (
    <GenreContext.Provider value={[genres, setGenres]}>
      {props.children}
    </GenreContext.Provider>
  );
}