import React, {useEffect, useState} from 'react';
import {makeURL} from '../utils/config';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method:"post",
      url: makeURL("/api/auth/register"),
      data: {
        username: username,
        email: email,
        password: password
      }
    }).then(response => {
      console.log(response);
      history.push('/login');
    }).catch(console.log);
  }

  return (
    <div>
      <h1>Register</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label><br/>
        <input type="text" value={username} onChange={handleChangeUsername}/><br/>
        <label>Email:</label><br/>
        <input type="email" value={email} onChange={handleChangeEmail}/><br/>
        <label htmlFor="password">Password:</label><br/>
        <input type="password" value={password} onChange={handleChangePassword}/>
        <div>
          <input type="submit" value="Submit"/>
        </div>
      </form>
    </div>
  )
}

export default Register