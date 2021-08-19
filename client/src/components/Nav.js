import React, {useEffect} from "react";
import './Nav.css';
import {Link} from "react-router-dom";
import {useUser} from "../context/UserContext";
import {cookies} from "../utils/util";


const Nav = () => {
  useEffect(() => {
    console.log(cookies.get('access_token'));
  },[])
  const linkNavStyle = {
    color: 'white',
    textDecoration: 'none'
  }

  const [user, setUser] = useUser();

  const logout = () => {
    cookies.remove("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  }

  return (
    <nav>
      <Link to={'/'} style={linkNavStyle}>
        <h3>Logo</h3>
      </Link>
      <ul className="nav-links">
        <Link to={'/artists'} style={linkNavStyle}>
          <li>Artists</li>
        </Link>
        <Link to={'/albums'} style={linkNavStyle}>
          <li>Albums</li>
        </Link>
        <Link to={'/search'} style={linkNavStyle}>
          <li>Search</li>
        </Link>
        {!user &&
        <Link to={'/login'} style={linkNavStyle}>
          <li className="nav-horizontal-line">Log in</li>
        </Link>
        }
        {!user &&
        <Link to={'/register'} style={linkNavStyle}>
          <li>Sign up</li>
        </Link>
        }
        {user &&
        <Link to={'/'} style={linkNavStyle} onClick={logout}>
          <li>Log out</li>
        </Link>
        }
        {user &&
          <Link to={`/profile/${user.username}`} style={linkNavStyle} >
            <li>{user.username}</li>
          </Link>
        }
      </ul>
    </nav>
  )
}

export default Nav

