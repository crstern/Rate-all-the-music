import React, {useState, useEffect} from 'react';
import {makeURL} from "../utils/config";
import {useHistory} from "react-router-dom";
import axios from 'axios';
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
    <div>
      <h1>Import new artist</h1>
      {loading === false &&
        <form onSubmit={handleSubmit}>
          <input type={"text"} value={artistName} onChange={handleChangeArtistName}/>
          <input type={"submit"} value={"submit"} />
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
  )
}

export default ImportPage;