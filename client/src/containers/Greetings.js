import React, {useContext, useEffect} from 'react';
import {UserContext, useUser} from "../context/UserContext";
import './Greetings.css';

const Greetings = () => {
  return (
    <div className="greetings">
      <h1 className="landing-quote">Rate your favourite musicians</h1>
    </div>
  )
}

export default Greetings