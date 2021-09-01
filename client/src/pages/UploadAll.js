import React, {useState} from 'react';
import {makeURL} from "../utils/config";
import axios from 'axios';
import {cookies} from "../utils/util";

const UploadAll = () => {
  const [status, setStatus] = useState("If you have admin rights, press the button to upload all the artists")
  const [error, setError] = useState('');
  const makeRequest = () => {
    setStatus("loading");
    axios({
      url:makeURL('/api/artists/upload'),
      method: "post",
      headers: {
        'x-access-token': cookies.get('access_token')
      },
    }).then(() => {
      setStatus("Done")
    }).catch(err => {
      console.log(err);
      setStatus(`error: ${err.response.data}`);
    })
  }

  return (
    <div>
      <h3>Upload for admins</h3>
      <button className={"button"} onClick={()=>makeRequest()}>Upload</button>
      <p>{status}</p>
    </div>
  )
}

export default UploadAll