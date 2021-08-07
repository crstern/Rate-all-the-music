import React, {useEffect}from 'react';
import {makeURL} from '../utils/config';


const Login = () => {

  useEffect(() => {
    fetchItems();
  },[])

  const fetchItems = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Origin", "localhost:3000");
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "username": "cristi",
      "password": "pass"
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:5000/api/users/login", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  return (
    <div>
      <h1>Log in</h1>
    </div>
  )
}

export default Login