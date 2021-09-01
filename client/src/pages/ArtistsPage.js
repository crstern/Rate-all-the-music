import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {scrollToTop} from "../utils/util";
import {useArtists} from "../context/ArtistContext";
import Artists from "../containers/Artists";
import axios from "axios"
import '../components/NextPreviousButtons.css';

const ArtistsPage = () => {
  const [page, setPage] = useState(1);
  const [artists, setArtists] = useArtists();
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);

  const fetchItems = async (page=1) => {
    axios({
      method: "get",
      url: makeURL(`/api/artists?page=${page}&size=12`)
    }).then(response => {
      setArtists(response.data.data);
      setHasNext(response.data.pagination.hasNext);
      setHasPrev(response.data.pagination.hasPrev);
    })
  }

  const handleChangePage = async (newPage) => {
    setPage(newPage);
    scrollToTop();
  };

  useEffect(() => {
    fetchItems(page)
  },[page])

  return (
    <div>
      <h1>Artists</h1>
      <Artists />
      <button onClick={() => handleChangePage(page - 1)} disabled={!hasPrev} className="slide left">
        <div>Prev</div>
        <i class="icon-arrow-left"></i>
      </button>
      <div className="page-num">{page}</div>
      <button onClick={() => handleChangePage(page + 1)} disabled={!hasNext} className="slide right">
        <div>Next</div>
        <i class="icon-arrow-right"></i>
      </button>
    </div>
  )
}

export default ArtistsPage;