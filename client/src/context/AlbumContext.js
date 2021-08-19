import React, {createContext, useContext, useState, useEffect} from "react"

export const AlbumContext = createContext();

export const useAlbums = () => useContext(AlbumContext)

export const AlbumsProvider = (props) => {
  const [albums, setAlbums] = useState([]);

  return (
    <AlbumContext.Provider value={[albums, setAlbums]}>
      {props.children}
    </AlbumContext.Provider>
  );
}