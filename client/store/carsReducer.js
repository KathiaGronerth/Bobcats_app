import axios from "axios";

const initialState = {
  cars: [],
};

// Action Types
const GOT_CARS = "GOT_CARS";
const ADD_CAR = "ADD_CAR"; // New action type

// Action Creators
export const getCars = (cars) => ({
  type: GOT_CARS,
  cars,
});

export const addCar = (car) => ({
  // New action creator
  type: ADD_CAR,
  car,
});

// Thunks
export const fetchCars = () => async (dispatch) => {
  try {
    const { data: cars } = await axios.get("/api/cars");
    dispatch(getCars(cars));
  } catch (error) {
    console.log("fetchCars thunk error", error);
  }
};

export const createCar = (carData) => async (dispatch) => {
  // New thunk
  try {
    const { data: newCar } = await axios.post("/api/cars", carData);
    dispatch(addCar(newCar));
  } catch (error) {
    console.error("Error creating a car", error);
  }
};

// Reducer
export default function cars(state = initialState, action) {
  switch (action.type) {
    case GOT_CARS:
      return {
        ...state,
        cars: action.cars,
      };
    case ADD_CAR: // Handle new car addition
      return {
        ...state,
        cars: [...state.cars, action.car],
      };
    default:
      return state;
  }
}
