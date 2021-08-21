import React, {useState} from 'react';
import {makeURL} from "../utils/config";
import axios from 'axios';
import {cookies} from "../utils/util";

const UploadForAdmins = () => {
  const [status, setStatus] = useState("press the button")
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
      <p>Upload for admins</p>
      <button onClick={()=>makeRequest()}>Upload</button>
      <p>{status}</p>
    </div>
  )
}

export default UploadForAdmins