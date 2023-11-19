import axios from "axios";

//Action types
const CREATE_NEW_PRODUCT = "CREATE_NEW_PRODUCT";
const UPDATE_PRODUCT = "UPDATE_PRODUCT";
const DELETE_PRODUCT = "DELETE_PRODUCT";

//Action creators
export const _createNewProduct = (product) => ({
  type: CREATE_NEW_PRODUCT,
  product,
});

export const _updateProduct = (product) => ({
  type: UPDATE_PRODUCT,
  product,
});

export const _deleteProduct = (product) => ({
  type: DELETE_PRODUCT,
  product,
});

//Thunk creators
export const createNewProduct = (product) => {
  return async (dispatch) => {
    const { data: created } = await axios.post("/api/products", product);
    dispatch(_createNewProduct(created));
  };
};

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(
      `/api/products/${product.id}`,
      product
    );
    dispatch(_updateProduct(updated));
    history.push("/");
  };
};

export const deleteProduct = (id, history) => {
  return async (dispatch) => {
    const { data: product } = await axios.delete(`/api/products/${id}`);
    dispatch(_deleteProduct(product));
    history.push("/");
  };
};

const initialState = {};

// Take a look at app/redux/index.js to see where this reducer is
// added to the Redux store with combineReducers
export default function administratorReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_PRODUCT:
      return [...state, action.product];
    case UPDATE_PRODUCT:
      return state.map((product) =>
        product.id === action.product.id ? action.product : product
      );
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
