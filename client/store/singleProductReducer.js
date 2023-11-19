import axios from "axios";

const initialState = {};

//Action Types
const GOT_SINGLE_PRODUCT = "GOT_SINGLE_PRODUCT";

//Action Creators
export const getSingleProduct = (product) => ({
  type: GOT_SINGLE_PRODUCT,
  product,
});

//Thunks
export const fetchSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(getSingleProduct(product));
    } catch (error) {
      console.log("fetchProduct thunk error", error);
    }
  };
};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function product(state = initialState, action) {
  switch (action.type) {
    case GOT_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
