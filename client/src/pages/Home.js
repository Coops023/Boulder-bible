import React from "react";
import Map from "../components/Map";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-body">
      <div className="background-image"></div>

      <div className="home-content">
        <h2>Welcome to the boulder bible</h2>
        <p>
          is slechts een proeftekst uit het drukkerij- en zetterijwezen. Lorem
          Ipsum is de standaard proeftekst in deze bedrijfstak sinds de 16e
          eeuw, toen een onbekende drukker een zethaak met letters nam en ze
          door elkaar husselde om een font-catalogus te maken. Het heeft niet
          alleen vijf eeuwen overleefd maar is ook.
        </p>
      </div>
    </div>
  );
}
