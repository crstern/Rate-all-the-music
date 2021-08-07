import React from "react";
import './Nav.css';
import {Link} from "react-router-dom";

const Nav = () => {
  const linkNavStyle = {
    color: 'white',
    textDecoration: 'none'
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
        <Link to={'/login'} style={linkNavStyle}>
          <li>Log in</li>
        </Link>
        <Link to={'/register'} style={linkNavStyle}>
          <li>Register</li>
        </Link>
      </ul>
    </nav>
  )
}

export default Nav

