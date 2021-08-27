import React, {useState, useEffect} from 'react';
import {makeURL} from "../utils/config";
import {useHistory} from "react-router-dom";
import axios from 'axios';
import './ImportPage.css';
import {cookies} from "../utils/util";

const ImportPage = () => {
  const [artistName, setArtistName] = useState("");
  const history = useHistory();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    console.log(artistName)
    e.preventDefault();
    setLoading(true);
    try{
      const response = await axios({
        method: "post",
        url: makeURL("/api/artists/"),
        data: {
          artist_name: artistName
        },
        headers: {
          'x-access-token': cookies.get('access_token')
        },
      })
      if (response.status === 200)
        history.push(`/artists/${response.data.data.id}`)
    }
    catch(err) {
      setError(err.response.data);
    }
    setLoading(false);
  }


  const handleChangeArtistName = (event) => {
    setArtistName(event.target.value);
  }

  return (
    <div className="import-container">
      <div className="import-item">
        <h1>Here you can import a new artist</h1>
        {loading === false &&
          <form className="form-container" onSubmit={handleSubmit}>
            <input className="import-input" type={"text"} value={artistName} placeholder="ex. Snoop Dogg" onChange={handleChangeArtistName}/>
            <input className="import-button" type={"submit"} value={"import!"} />
            {error &&
            <p>
              {error}
            </p>}
          </form>
        }

        {loading === true &&
          <div>loading</div>
        }

      </div>
      <div className="svg-image"></div>
    </div>
  )
}

export default ImportPage;