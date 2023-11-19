import axios from "axios";

const initialState = {
  cars: [],
};

//Action Types
const GOT_CARS = "GOT_CARS";

//Action Creators
export const getCars = (cars) => ({
  type: GOT_CARS,
  cars,
});

//Thunks
export const fetchCars = () => {
  return async (dispatch) => {
    try {
      const { data: cars } = await axios.get("/api/cars");
      dispatch(getCars(cars));
    } catch (error) {
      console.log("fetchCars thunk error", error);
    }
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function cars(state = initialState, action) {
  switch (action.type) {
    case GOT_CARS:
      return {
        ...state,
        products: action.products,
      };
    default:
      return state;
  }
}
