// src/context/auth.context.js

import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:3000";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const verifyStoredToken = () => {
    //  <==  ADD
    // Get the stored token from the localStorage
    const storedToken = localStorage.getItem("authToken");

    // If the token exists in the localStorage
    if (storedToken) {
      // We must send the JWT token in the request's "Authorization" Headers
      axios
        .get(`${API_URL}/users/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // If the server verifies that JWT token is valid
          const user = response.data;
          setUser(user);
          setIsLoggedIn(true);
          setIsLoading(false);
        })
        .catch((error) => {
          // If the server sends an error response (invalid token)
          setIsLoggedIn(false);
          setUser(null);
          setIsLoading(false);
        });
    } else {
      // If the token is not available
      setIsLoading(false);
    }
  };

  const logOutUser = () => {
    console.log("click");
    // <== ADD
    // Upon logout, remove the token from the localStorage
    localStorage.removeItem("authToken");

    // Update the state variables
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    verifyStoredToken();
  }, []);

  const logInUser = (token) => {
    localStorage.setItem("authToken", token);
    verifyStoredToken();
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, logInUser, logOutUser }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
