import logo from "./logo.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route exact path="/signup" component={SignupPage} />
      </Routes>
    </div>
  );
}

export default App;
