import React, {useContext, useEffect} from 'react';
import {UserContext, useUser} from "../context/UserContext";
import './Greetings.css';

const Greetings = () => {
  const [user, setUser] = useUser();
  return (
    <div className="greetings">
      {user && <h1>Welcome {user.username}</h1>}
      {!user && <h1 className="landing-quote">Rate your favourite musicians</h1>}
    </div>
  )
}

export default Greetings