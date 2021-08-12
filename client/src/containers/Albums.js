import React, {useContext, useEffect, useState} from 'react';
import {makeURL} from '../utils/config';
import {Link} from 'react-router-dom';
import {UserContext} from "./UserContext";

const Albums = () => {
  useEffect(() => {
    fetchItems(page).then(() => {
        console.log("rerendering");
      }
    );
  },[])

  const [albums, setAlbums] = useState([]);
  const [hasNext, setHasNext] = useState(true);
  const [hasPrev, setHasPrev] = useState(false);
  const [page, setPage] = useState(1);

  const handleChangePage = async (newPage) => {
    setPage(newPage);
    await fetchItems(newPage);
    scrollToTop();
  };


  const fetchItems = async (page=1) => {
    const fetched = await fetch(makeURL(`/api/albums?page=${page}&size=${10}`));
    const data = await fetched.json();

    setAlbums(data.data.map(item => (
      <li key={item.name}>
        <img src={makeURL("/api/images/" + item.image.filename)} alt={item.name + " cover"}/>
        <Link to={`/albums/${item.id}`}>
          <h3>{item.name}</h3>
        </Link>
      </li>
    )));
    setHasNext(data.pagination.hasNext);
    setHasPrev(data.pagination.hasPrev);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  const [user, setUser] = useContext(UserContext);

  return (
    <div>
      {user && <h1>Welcome {user.username}</h1>}
      <h1>Albums</h1>
      {albums}
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

export default Albums