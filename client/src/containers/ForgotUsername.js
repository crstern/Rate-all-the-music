import React, {useState} from 'react';
import {makeURL} from "../utils/config";
import axios from 'axios';

const ForgotUsername = () => {
  const [email, setEmail] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios({
      method:"post",
      url: makeURL("/api/auth/forgot_username"),
      data: {
        email: email
      }
    }).then((response) => {
      const data = response.data.data;
      setResponse(response.data.data);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <div>
      <h1>Forgot username</h1>
      {error &&
        <p>{error}</p>
      }
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Email:</label><br/>
        <input type="text" value={email} onChange={handleChangeEmail}/><br/>
        <div>
          <input type="submit" value="Submit"/>
        </div>
      </form>
      {response &&
        <p>{response}</p>
      }
    </div>
  );
}

export default ForgotUsername