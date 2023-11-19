import axios from "axios";

const initialState = {
  paymentMethods: [], // Use this key to store the payment methods
};

// Action Types
const GOT_PAYMENT_METHODS = "GOT_PAYMENT_METHOD";
const ADD_PAYMENT_METHOD = "ADD_PAYMENT_METHOD";
const REMOVE_PAYMENT_METHOD = "REMOVE_PAYMENT_METHOD";
const SELECT_PAYMENT_METHOD = "SELECT_PAYMENT_METHOD";

export const getPaymentMethods = (paymentMethods) => ({
  type: GOT_PAYMENT_METHODS,
  paymentMethods,
});

export const addPaymentMethod_ = (paymentMethod) => ({
  type: ADD_PAYMENT_METHOD,
  paymentMethod,
});

export const removePaymentMethod = (paymentMethod) => ({
  type: REMOVE_PAYMENT_METHOD,
  paymentMethod,
});

export const selectPaymentMethod = (method) => ({
  type: SELECT_PAYMENT_METHOD,
  payload: method,
});

// Action Creators
export const fetchPaymentMethodsByUserId = (userId) => {
  return async (dispatch) => {
    try {
      const { data: paymentMethods } = await axios.get(
        `/api/paymentMethod/user/${userId}`
      );
      dispatch(getPaymentMethods(paymentMethods));
    } catch (error) {
      console.error("fetchPaymentMethodsByUserId thunk error", error);
    }
  };
};

export const addPaymentMethod = (userId, paymentMethod) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `/api/paymentMethod/user/${userId}/`,
        paymentMethod
      );
      dispatch(addPaymentMethod_(response.data));
    } catch (error) {
      console.error("Error adding payment method:", error);
    }
  };
};

// Reducer
export default function paymentMethods(state = initialState, action) {
  switch (action.type) {
    case GOT_PAYMENT_METHODS:
      return { ...state, paymentMethods: action.paymentMethods };
    case ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethods: [...state.paymentMethods, action.paymentMethod],
      };
    case REMOVE_PAYMENT_METHOD:
      return { ...state, paymentMethods: action.paymentMethods };
    case SELECT_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.paymentMethod,
      };
    default:
      return state;
  }
}
