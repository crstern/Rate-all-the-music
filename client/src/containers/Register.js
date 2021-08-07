import React, {useEffect} from 'react';
import {makeURL} from '../utils/config';

const Register = () => {
  useEffect(() => {
    fetchItems();
  },[])

  const fetchItems = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": "cristi",
      "password": "pass",
      "email": "mail"
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/users/register", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };
  return (
    <div>
      <h1>Register</h1>
    </div>
  )
}

export default Register