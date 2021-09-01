export const CONFIG = {
  API_BASE_URL: "http://localhost:5000"
}

const makeURL = (apiURL) => (CONFIG.API_BASE_URL + apiURL);

export {makeURL};