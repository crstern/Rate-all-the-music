export const CONFIG = {
  API_BASE_URL: "http://localhost:5000",
  AUTH_URL: "http://localhost:5500"
}

const makeURL = (apiURL) => (CONFIG.API_BASE_URL + apiURL);
const makeAuthURL = (apiURL) => (CONFIG.AUTH_URL + apiURL);


export {makeURL, makeAuthURL};