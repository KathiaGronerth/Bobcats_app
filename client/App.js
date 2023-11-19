import React from "react";
import MainRoutes from "./MainRoutes";
import NavBar from "./NavBar";
import history from "./history";

function App() {
  return (
    <div history={history}>
      <NavBar />
      <MainRoutes />
    </div>
  );
}

export default App;
