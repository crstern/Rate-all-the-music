import React, {useState, useEffect, useContext} from 'react';
import { useHistory, Link } from "react-router-dom";
import {makeURL} from "../utils/config";
import axios from 'axios';
import {UserContext} from "../context/UserContext";
import {cookies} from "../utils/util";
import './Login.css';


const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useContext(UserContext)
  const [error, setError] = useState(null);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleSubmit = (e) =>  {
    e.preventDefault();
    axios.post(
      makeURL('/api/auth/login'), {
        "username": username,
        "password": password
      })
      .then((response) => {
        const data = response.data.data;
        setUser(data.user);
        cookies.set('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
        history.push('/')
      }).catch(err => {
      setError(err.response.data);
      console.log(err.response.data)
    })
  }

  return (
    <div className="login-container">
      <div className="login-wraper">
        <h1>Log in</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username:</label>
          <input type="text" placeholder="Username" value={username} onChange={handleChangeUsername}/>
          <label htmlFor="password">Password:</label>
          <input type="password" placeholder="Password" value={password} onChange={handleChangePassword}/>
          <div>
            <input type="submit" value="Log in"/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;