// store/reducers/driversReducer.js
const initialState = {
  drivers: [],
};

// Action Types
const ADD_DRIVER = "ADD_DRIVER";
const SET_DRIVERS = "SET_DRIVERS";

// Action Creators
export const addDriver = (driver) => ({ type: ADD_DRIVER, driver });
export const setDrivers = (drivers) => ({ type: SET_DRIVERS, drivers });

// Thunks (Assuming you have API endpoints to handle these)
export const fetchDrivers = () => async (dispatch) => {
  try {
    const response = await fetch("/api/drivers");
    const data = await response.json();
    dispatch(setDrivers(data));
  } catch (error) {
    console.error("Error fetching drivers", error);
  }
};

export const createDriver = (driverData) => async (dispatch) => {
  try {
    const response = await fetch("/api/drivers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(driverData),
    });
    const data = await response.json();
    dispatch(addDriver(data));
  } catch (error) {
    console.error("Error creating a driver", error);
  }
};

// Reducer
export default function drivers(state = initialState, action) {
  switch (action.type) {
    case ADD_DRIVER:
      return { ...state, drivers: [...state.drivers, action.driver] };
    case SET_DRIVERS:
      return { ...state, drivers: action.drivers };
    default:
      return state;
  }
}
