import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useUser } from '../context/UserContext';
import {cookies} from "../utils/util";


const NavLinks = (props) => {
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
    
    const [classNamesLinks, setClassNameLinks] = useState(props.classNameLinks);
    
    const handleClickLink = () => {
      setClassNameLinks("nav-links");
    }

    useEffect(() => {
      setClassNameLinks(props.classNameLinks);
    }, [props])

    return (
        <ul className={classNamesLinks}>
          <li><Link to={'/artists'} className="mobile-text" onClick={handleClickLink}>Artists</Link></li>
          <li><Link to={'/albums'} className="mobile-text" onClick={handleClickLink}>Albums</Link></li>
          <li><Link to={'/genres'} className="mobile-text" onClick={handleClickLink}>Genres</Link></li>
          <li><Link to={'/search'} className="mobile-text" onClick={handleClickLink}>Search</Link></li>
          {
            user &&
            <li><Link to={'/import'} className="mobile-text" onClick={handleClickLink}>Import</Link></li>
          }
          {user && user.admin === true &&
          <li><Link to={'/uploadAll'} className="mobile-text" onClick={handleClickLink}>Import All</Link></li>
          }
          <li className="vertical-line"></li>
        {!user &&
          <li className="desaturated"><Link to={'/login'} onClick={handleClickLink}>Log in</Link></li>       
        }
        {!user &&
          <li className="desaturated"><Link to={'/register'} onClick={handleClickLink}>Sign up</Link></li>
        }
        {user &&
          <li><Link to={'/'} onClick={() => {
            handleClickLink()
            logout();
          }}>Log out</Link></li>
        }
        {user &&
            <li className="user"><Link to={`/profile/${user.username}`} style={linkNavStyle} onClick={handleClickLink}>{user.username}</Link></li>
        }
      </ul>
    )
}

export default NavLinks;