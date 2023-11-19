import axios from "axios";

const initialState = {};

//Action Types
const GOT_SINGLE_USER = "GOT_SINGLE_USER";
const UPDATE_USER = "UPDATE_USER";

//Action Creators
export const getSingleUser = (user) => ({
  type: GOT_SINGLE_USER,
  user,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

export const saveUserDetails = (updatedUser) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        // Handle the case where there is no token present.
        // You could dispatch an action here to update the state to reflect the error.
        console.error("Authorization token not found");
        return;
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (!updatedUser.id) {
        throw new Error("User ID is missing");
      }

      const { data: user } = await axios.put(
        `/api/users/${updatedUser.id}`,
        updatedUser,
        { headers }
      );

      dispatch(updateUser(user));
    } catch (error) {
      console.error("saveUserDetails thunk error", error);
      // Handle errors appropriately here, possibly updating the state with the error message.
    }
  };
};

//Thunks
export const fetchSingleUser = (id) => {
  return async (dispatch) => {
    try {
      const { data: user } = await axios.get(`/api/users/${id}`);
      dispatch(getSingleUser(user));
    } catch (error) {
      console.log("fetchUser thunk error", error);
    }
  };
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case GOT_SINGLE_USER:
      return action.user;
    case UPDATE_USER:
      return action.user;
    default:
      return state;
  }
}
