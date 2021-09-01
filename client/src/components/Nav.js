import React, {useEffect, useState} from "react";
import './Nav.css';
import {Link} from "react-router-dom";
import NavLinks from './NavLinks'; 


const Nav = () => {
  const linkNavStyle = {
    color: 'white',
    textDecoration: 'none'
  }
  const [classNameLinks, setClassNameLinks] = useState("nav-links");
  const [active, setActive] = useState(0);

  useEffect(() => {
    let newClass = "";
    if (active === 1){
      newClass = "active";
    }
    setClassNameLinks(`nav-links ${newClass}`);
  }, [active])

  return (
    <nav>
      <div className="logo">
      <Link to={'/'} style={linkNavStyle} className="logo-link">
        <img src={require("../images/vinyl.png")} alt="vinyl icon"/>
        <h3>RATM</h3>
      </Link>
      </div>
      <a href="#" className="toggle-button" onClick={() => {
        setActive(1 - active);
      }}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <NavLinks classNameLinks={classNameLinks}/>
      
    </nav>
  )
}

export default Nav

