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

  const [errorUsername, setErrorUsername] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
    if (! isUsernameValid(event.target.value)){
      setErrorUsername(true);
    }else setErrorUsername(false);
  }

  const handleChangePassword = async (event) => {
    await setPassword(event.target.value);
    if(! isPasswordValid(event.target.value)){
      setErrorPassword(true);
    }else setErrorPassword(false);
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    if (! isEmailValid(event.target.value)){
      setErrorEmail(true);
    }else setErrorEmail(false);
  }

  const isUsernameValid = (username) => {
    return username.length >= 6;
  }

  const isPasswordValid = (password) => {
    const re = /(\w{7,})(\d)/
    return re.test(password);
  }

  const isEmailValid = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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
        {errorUsername &&
        <p>Username length must be at least 6</p>}
        <label>Email:</label><br/>
        <input type="email" value={email} onChange={handleChangeEmail}/><br/>
        {errorEmail &&
        <p>The email you provided is incorrect</p>}
        <label htmlFor="password">Password:</label><br/>
        <input type="password" value={password} onChange={handleChangePassword}/>
        {errorPassword &&
        <p>Password length must be at least 8 and must include at least a number</p>}
        <div>
          <input type="submit" value="Submit" disabled={errorPassword || errorUsername}/>
        </div>
      </form>
    </div>
  )
}

export default Register