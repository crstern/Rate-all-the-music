import React, {useState} from 'react';
import {makeURL} from "../utils/config";
import {useArtists} from "../context/ArtistContext";
import axios from 'axios';
import {useAlbums} from "../context/AlbumContext";
import {useGenres} from "../context/GenreContext";
import {Link} from 'react-router-dom';
import "./SearchForm.css";

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [artists, setArtists] = useArtists();
  const [albums, setAlbums] = useAlbums();
  const [genres, setGenres] = useGenres();
  const [submited, setSubmited] = useState(false);

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value)
    setSubmited(false);
  }

  const handleSubmitSearch = async (e) => {
    e.preventDefault();
    axios({
      method:"get",
      url: makeURL(`/api/artists/search/${searchTerm}`)
    }).then(async response => {
      setArtists(response.data.data);
    })

    axios({
      method:"get",
      url: makeURL(`/api/albums/search/${searchTerm}`)
    }).then(async response => {
      setAlbums(response.data.data);
    })

    axios({
      method:"get",
      url: makeURL(`/api/genres/search/${searchTerm}`)
    }).then(async response => {
      setGenres(response.data.data);
    })
    setSubmited(true);
  }

  return (
    <div className="search-form-wraper">
      <div className="search-form">
        <h1>Find an artist, an album or a genre</h1>
        <form onSubmit={handleSubmitSearch}>
          <input className="search-input" type={"text"} value={searchTerm} placeholder="ex. Orbital" onChange={handleChangeSearchTerm}/>
          {
            albums.length + artists.length + genres.length === 0 && submited===true &&
            <p>Your search "{searchTerm}" did not match any results.</p>
          }
          <input className="submit-input" type={"submit"} value={"submit"}/>
        </form>

      </div>
      <div className="find-artist-link">
        <h1>Can't find an artist?</h1>
        <button className="import-artist-button">
          <Link to={"/import"} >
            Import one
          </Link>
        </button>
      </div>
    </div>
  )
}

export default SearchForm;