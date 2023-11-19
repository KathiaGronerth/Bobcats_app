import axios from "axios";
import history from "../history";

const TOKEN = "token";

// Action Types
const SET_AUTH = "SET_AUTH";
const UPDATE_USER = "UPDATE_USER";

// Action Creators
export const setAuth = (auth) => ({ type: SET_AUTH, auth });
export const updateUser = (user) => ({ type: UPDATE_USER, user });

// Thunk Creators
export const me = (origin) => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    if (origin === "/login") {
      history.push("/");
    } else if (origin === "/signup") {
      history.push("/saveCard");
    }
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (userData, method) => async (dispatch) => {
  try {
    localStorage.clear();
    let res;
    if (method === "signup") {
      const formData = new FormData();
      Object.keys(userData).forEach((key) => {
        if (key === "photo") {
          formData.append(key, userData[key], userData[key].name);
        } else {
          formData.append(key, userData[key]);
        }
      });
      res = await axios.post(`/auth/${method}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      const { email, password } = userData;
      res = await axios.post(`/auth/${method}`, { email, password });
    }
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

// Reducer
const authReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    case UPDATE_USER:
      if (state.id === action.user.id) {
        return { ...state, ...action.user };
      }
      return state;
    default:
      return state;
  }
};

export default authReducer;
