import React, {useEffect, useState} from 'react';
import {makeURL} from '../utils/config';
import axios from 'axios';
import { useHistory, Link } from "react-router-dom";
import './Register.css';

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
      document.getElementById("username").classList.add('error');
    }else {
      setErrorUsername(false);
      document.getElementById("username").classList.remove('error');}
  }

  const handleChangePassword = async (event) => {
    await setPassword(event.target.value);
    if(! isPasswordValid(event.target.value)){
      setErrorPassword(true);
      document.getElementById("password").classList.add('error');
    }else {
      setErrorPassword(false);
      document.getElementById("password").classList.remove('error');
    }
  }

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    if (! isEmailValid(event.target.value)){
      setErrorEmail(true);
      document.getElementById("email").classList.add('error');
    }else {
      setErrorEmail(false);
      document.getElementById("email").classList.remove('error');
    }
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
    if (isEmailValid(email) && isPasswordValid(password) && isUsernameValid(username)) {
      axios({
        method: "post",
        url: makeURL("/api/auth/register"),
        data: {
          username: username,
          email: email,
          password: password
        }
      }).then(() => {
        history.push('/login');
      }).catch(console.log);
    }
  }

  return (
    <div className="register-container">
      <div className="register-item">
        <div className="svg-img"></div>
        <div className="register-wraper">
          <h1>Register</h1>
          {error && <p>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="username">Username:</label>
              <input  id="username" type="text" placeholder="Username" value={username} onChange={handleChangeUsername}/>
              {errorUsername &&
              <p>Username length must be at least 6 characters</p>}
            </div>
            <div className="form-control">
              <label>Email:</label>
              <input id="email" type="email" placeholder="Email Address" value={email} onChange={handleChangeEmail}/>
              {errorEmail &&
              <p>The email you provided is incorrect</p>}
            </div>
            <div className="form-control">
              <label htmlFor="password">Password:</label>
              <input id="password" type="password" placeholder="Password" value={password} onChange={handleChangePassword}/>
              {errorPassword &&
              <p>Password length must be at least 8 characters and must include at least one number</p>}
            </div>
            <input type="submit" value="Sign up!" disabled={errorPassword || errorUsername}/>

          </form>
          <p className="login-link">
              Already have an account? <Link to={'./Login'}><span>Log in</span></Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register