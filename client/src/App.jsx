import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
  Link,
  BrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AddClimb from "./components/AddClimb";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/climb/add" element={<AddClimb />} />
      </Routes>
    </div>
  );
}

export default App;
