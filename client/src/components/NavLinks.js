import React from 'react';
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

    return (
        <ul className={props.classNameLinks}>
          <li><Link to={'/artists'} className="mobile-text">Artists</Link></li>
          <li><Link to={'/albums'} className="mobile-text">Albums</Link></li>
          <li><Link to={'/search'} className="mobile-text">Search</Link></li>
          <li className="vertical-line"></li>
        {!user &&
          <li className="desaturated"><Link to={'/login'}>Log in</Link></li>       
        }
        {!user &&
          <li className="desaturated"><Link to={'/register'}>Sign up</Link></li>
        }
        {user &&
          <li><Link to={'/'} onClick={logout}>Log out</Link></li>
        }
        {user &&
            <li className="user"><Link to={`/profile/${user.username}`} style={linkNavStyle}>{user.username}</Link></li>
        }
      </ul>
    )
}

export default NavLinks;