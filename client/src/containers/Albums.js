import React,  {useEffect, useState} from 'react';
import {makeURL} from '../utils/config';

const Albums = () => {
  useEffect(() => {
    fetchItems(page);
  },[])

  const [albums, setAlbums] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const [page, setPage] = useState(1);

  const handleChangePage = (newPage) => {
    setPage(newPage);
    fetchItems(newPage)
  };


  const fetchItems = async (page=1) => {
    const fetched = await fetch(makeURL(`/api/albums?page=${page}&size=${10}`));
    const data = await fetched.json();

    setAlbums(data.data.map(item => (
      <li key={item.name}>
        <img src={makeURL("/api/images/" + item.image.filename)} alt={item.name + " cover"}/>
        <h3>{item.name}</h3>
      </li>
    )));
    setHasNext(data.pagination.hasNext);
    setHasPrev(data.pagination.hasPrev);
  };
  return (
    <div>
      <h1>Albums</h1>
      <button onClick={() => handleChangePage(page - 1)} disabled={!hasPrev}>
        prev
      </button>
      {page}
      <button onClick={() => handleChangePage(page + 1)} disabled={!hasNext}>
        next
      </button>
      {albums}

    </div>

  )
}

export default Albums