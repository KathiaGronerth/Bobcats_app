// store/reducers/ridesReducer.js
import axios from "axios";

const initialState = {
  rides: [],
};

// Action Types
const GOT_RIDES = "GOT_RIDES";
const ADD_RIDE = "ADD_RIDE";

// Action Creators
export const gotRides = (rides) => ({ type: GOT_RIDES, rides });
export const addRide = (ride) => ({ type: ADD_RIDE, ride });

// Thunks
export const fetchRides = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/rides");
    dispatch(gotRides(data));
  } catch (error) {
    console.error("Error fetching rides", error);
  }
};

export const createRide = (rideData) => async (dispatch) => {
  try {
    const { data } = await axios.post("/api/rides", rideData);
    dispatch(addRide(data));
  } catch (error) {
    console.error("Error creating a ride", error);
  }
};

// Reducer
export default function rides(state = initialState, action) {
  switch (action.type) {
    case GOT_RIDES:
      return { ...state, rides: action.rides };
    case ADD_RIDE:
      return { ...state, rides: [...state.rides, action.ride] };
    default:
      return state;
  }
}
