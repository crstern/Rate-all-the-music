import React, {useState, useEffect, useContext} from 'react';
import { useHistory, Link } from "react-router-dom";
import {makeURL} from "../utils/config";
import axios from 'axios';
import {UserContext} from "../context/UserContext";
import {cookies} from "../utils/util";


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
    <div className={"search-form"}>
      <h1>Log in</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label><br/>
        <input className={"search-input"} type="text" value={username} onChange={handleChangeUsername}/><br/>
        <label htmlFor="password">Password:</label><br/>
        <input className={"search-input"} type="password" value={password} onChange={handleChangePassword}/>
        <div>
          <input type="submit" value="Submit"/>
        </div>
      </form>

    </div>
  )
}

export default Login;