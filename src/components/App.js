import React from "react";
import history from "./history";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "../MainRoutes";
import NavBar from "../NavBar";

function App() {
  return (
    <Router>
      <div style={{height: '100%'}}>
        <NavBar />
        <MainRoutes />
      </div>
    </Router>
  );
}

export default App;
