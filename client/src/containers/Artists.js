import React, {useState, useEffect} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {scrollToTop} from "../utils/util";


const Artists = () => {
  useEffect(() => {
    fetchItems(page)
  },[page])


  const [page, setPage] = useState(1);
  const [artists, setArtists] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);

  const handleChangePage = async (newPage) => {
    setPage(newPage);
    await fetchItems(newPage);
    scrollToTop();
  };



  const fetchItems = async (page=1) => {
    const fetched = await fetch(makeURL(`/api/artists?page=${page}&size=${10}`));
    const data = await fetched.json();
    setArtists(data.data.map(item => (
      <li key={item.id}>
          <img src={makeURL("/api/images/" + item.image.filename)} alt={item.name + " picture"}/>
        <Link to={`/artists/${item.id}`}>
          <h1>{item.name}</h1>
        </Link>
      </li>
    )));
    setHasNext(data.pagination.hasNext);
    setHasPrev(data.pagination.hasPrev);
  };

  return (
    <div>
      <h1>Artists</h1>
      <ul>
        {artists}
      </ul>
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

export default Artists