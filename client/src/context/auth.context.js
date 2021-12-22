// src/context/auth.context.js

import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:3000";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const logInUser = (token) => {
    //  <==  ADD
    localStorage.setItem("authToken", token);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
