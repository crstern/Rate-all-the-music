import React, {useState, useEffect, createContext, useContext} from "react";
import axios from 'axios';
import {makeURL} from "../utils/config";
import {cookies} from "../utils/util";


export const UserContext = createContext([]);

export const useUser = () => useContext(UserContext);

export const UserProvider = (props) => {
  const [user, setUser] = useState(null);
  const [working, setWorking] = useState(true);

  const refreshToken = () => {
    axios({
      method: 'get',
      url: makeURL('/api/auth/refresh_token'),
      headers: {
        'x-refresh-token': localStorage.getItem('refresh_token')
      }
    }).then(response => {
      cookies.set('access_token', response.data.data.access_token);
      console.log(cookies.get('access_token'))
      axios({
        method:'get',
        url: makeURL('/api/auth/get_current_user'),
        headers: {
          'x-access-token': cookies.get('access_token')
        }
      }).then(response => {
        console.log('getting user')
        setUser(response.data.data)
      }).catch(console.log)

      setTimeout(() => {
        refreshToken()
      }, (1800 * 1000) - 500)
    })
    .catch(console.log)
    .finally(() => {
      setWorking(false);
    });
}

  useEffect(() => {
    refreshToken();
    // eslint-disable-next-line
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {working ? null : props.children}
    </UserContext.Provider>
  )
}

