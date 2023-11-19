import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
// import products from "./productsReducer";
// import product from "./singleProductReducer";
import users from "./usersReducer";
import reviews from "./reviewReducer";
// import paymentMethods from "./paymentMethod";
import user from "./singleUserReducer";
// import orders from "./orderReducer";
import cars from "./carsReducer";
import rides from "./ridesReducer";
import drivers from "./driversReducer";

const reducer = combineReducers({
  auth,
  // products,
  // product,
  users,
  user,
  reviews,
  // paymentMethods,
  // orders,
  cars,
  rides,
  drivers,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;

export * from "./auth";
