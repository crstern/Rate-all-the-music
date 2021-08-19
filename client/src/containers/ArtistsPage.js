import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {scrollToTop} from "../utils/util";
import {useArtists} from "../context/ArtistContext";
import Artists from "./Artists";

const ArtistsPage = () => {
  const [page, setPage] = useState(1);
  const [artists, setArtists] = useArtists();
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);

  const fetchItems = async (page=1) => {
    const fetched = await fetch(makeURL(`/api/artists?page=${page}&size=${10}`));
    const data = await fetched.json();
    setArtists(data.data);
    setHasNext(data.pagination.hasNext);
    setHasPrev(data.pagination.hasPrev);
  }

  const handleChangePage = async (newPage) => {
    setPage(newPage);
    await fetchItems(newPage);
    scrollToTop();
  };

  useEffect(() => {
    fetchItems(page)
  },[page])

  return (
    <div>
      <h1>Artists</h1>
      <Artists />
      <button onClick={() => handleChangePage(page - 1)} disabled={!hasPrev}>
        prev
      </button>
      {page}
      <button onClick={() => handleChangePage(page + 1)} disabled={!hasNext}>
        next
      </button>
    </div>
  )
}

export default ArtistsPage;