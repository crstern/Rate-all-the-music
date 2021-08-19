import React, {useContext, useEffect, useState} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import {useAlbums} from "../context/AlbumContext";
import {scrollToTop} from "../utils/util";
import Artists from "./Artists";
import Albums from "./Albums";

const AlbumsPage = () =>{
  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useAlbums();
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);

  const fetchItems = async (page=1) => {
    const fetched = await fetch(makeURL(`/api/albums?page=${page}&size=${10}`));
    const data = await fetched.json();
    setAlbums(data.data);
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
      <h1>Albums</h1>
      <Albums />
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

export default AlbumsPage;