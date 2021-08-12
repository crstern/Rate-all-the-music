import React from "react";
import './Nav.css';
import {Link} from "react-router-dom";
import {useUser} from "../containers/UserContext";
import {cookies} from "../utils/util";


const Nav = () => {
  const linkNavStyle = {
    color: 'white',
    textDecoration: 'none'
  }

  const [user, setUser] = useUser();

  const logout = () => {
    cookies.remove("refresh_token");
    localStorage.removeItem("access_token");
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
        {!user &&
        <Link to={'/login'} style={linkNavStyle}>
          <li>Log in</li>
        </Link>
        }
        {!user &&
        <Link to={'/register'} style={linkNavStyle}>
          <li>Register</li>
        </Link>
        }

        {user &&
        <Link to={'/'} style={linkNavStyle} onClick={logout}>
          <li>Log out</li>
        </Link>
        }
      </ul>
    </nav>
  )
}

export default Nav

