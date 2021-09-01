import React, {useContext, useEffect, useState} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {UserContext} from "../context/UserContext";
import {useAlbums} from "../context/AlbumContext";
import {scrollToTop} from "../utils/util";
import Artists from "../containers/Artists";
import Albums from "../containers/Albums";
import '../components/NextPreviousButtons.css';

const AlbumsPage = () =>{
  const [page, setPage] = useState(1);
  const [albums, setAlbums] = useAlbums();
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);

  const fetchItems = async (page=1) => {
    const fetched = await fetch(makeURL(`/api/albums?page=${page}&size=${12}`));
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
      <h1 className="albums-title">Albums</h1>
      <Albums />
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

export default AlbumsPage;