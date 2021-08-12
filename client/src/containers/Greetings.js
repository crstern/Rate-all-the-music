import React, {useContext, useEffect} from 'react';
import {UserContext, useUser} from "./UserContext";


const Greetings = () => {
  const [user, setUser] = useUser()
  return (
    <div>
      {user && <h1>Welcome {user.username}</h1>}
      <h1>Greetings</h1>
    </div>
  )
}

export default Greetings