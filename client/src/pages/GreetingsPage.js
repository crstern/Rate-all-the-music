import React, {useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {UserContext, useUser} from "../context/UserContext";
import './Greetings.css';

const GreetingsPage = () => {
  const [user, setUser] = useUser();

  return (
    <div className="greetings spacer layer1">
      <div className="quots-container">
      <h1 className="landing-quote">Rate your favorite musicians</h1>
      <h2>Hundreds of artists. Thousands of albums.</h2>
      </div>
      <div className="button-container">
        <button className="get-started">
          {user && 
          <Link to={"/Artists"}>
            Start Rating!
          </Link>
          }
          {!user &&
          <Link to={"/Register"}>
            Get Started!
          </Link>
          }
          
        </button>
      </div>
    </div>
  )
}

export default GreetingsPage