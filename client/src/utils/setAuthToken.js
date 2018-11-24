// I guess if they have a token in
// local storage after they log in,
// then it will attach the token to
// the authorization header for every
// request moving forward.

import axios from "axios";

const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setAuthToken;
