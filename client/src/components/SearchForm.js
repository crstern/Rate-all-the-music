import React, {useState, useEffect} from 'react';
import {makeURL} from "../utils/config";
import {useArtists} from "../context/ArtistContext";
import axios from 'axios';
import {useAlbums} from "../context/AlbumContext";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useArtists();
  const [albums, setAlbums] = useAlbums();

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    axios({
      method:"get",
      url: makeURL(`/api/artists/search/${searchTerm}`)
    }).then(async response => {
      console.log(response.data.data);
      setArtists(response.data.data);
    })

    axios({
      method:"get",
      url: makeURL(`/api/albums/search/${searchTerm}`)
    }).then(async response => {
      setAlbums(response.data.data);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmitSearch}>
        <input type={"text"} value={searchTerm} onChange={handleChangeSearchTerm}/> <br/>
        <input type={"submit"} value={"submit"}/>
      </form>
    </div>
  )
}

export default SearchForm;