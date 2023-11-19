// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import { Router } from "react-router-dom";
// import history from "./history";
// import store from "./store";
// import App from "./components/App";

// ReactDOM.render(
//   <Provider store={store}>
//     <Router history={history}>
//       <App />
//     </Router>
//   </Provider>,

//   document.getElementById("app")
// );

import React from "react";
import ReactDOM from "react-dom/client"; // Import for React 18
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"; // Use BrowserRouter
import store from "./store";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
