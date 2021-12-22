// src/components/Navbar.js

import { Link } from "react-router-dom";
import { useContext } from "react"; // <== IMPORT
import { AuthContext } from "../context/auth.context"; // <== IMPORT

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext); // <== ADD

  //  Update the rendering logic to display different content
  //  depending on the user being logged in or not
  return (
    <nav>
      <Link to="/">
        <button>Home</button>
      </Link>

      {isLoggedIn ? (
        <>
          <Link to="/climb/add">
            <button>Add route</button>
          </Link>
          <button onClick={logOutUser}>Logout</button> {/*  <== UPDATE   */}
          <span>{user.name}</span>
        </>
      ) : (
        <>
          <Link to="/signup">
            {" "}
            <button>Signup</button>{" "}
          </Link>
          <Link to="/login">
            {" "}
            <button>Login</button>{" "}
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
