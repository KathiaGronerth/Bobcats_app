import axios from "axios";

const initialState = {
  totalCost: 0,
  shoppingMethod: "",
  paymentMethod: "",
  orderDate: "",
  cardName: "",
  state: "",
  orders: [],
};

// Action Types
const GOT_ORDERS = "GOT_ORDERS";
const GOT_ORDER = "GOT_ORDER";
const ADD_ORDER = "ADD_ORDER";
const REMOVE_ORDER = "REMOVE_ORDER";
const APPLY_PROMO_CODE = "APPLY_PROMO_CODE";
const SELECT_DELIVERY_METHOD = "SELECT_DELIVERY_METHOD";

// Action Creators
export const getOrders = (orders) => ({
  type: GOT_ORDERS,
  orders,
});

export const getOrder = (order) => ({
  type: GOT_ORDER,
  order,
});

export const addOrder_ = (order) => ({
  type: ADD_ORDER,
  order,
});

export const removeOrder = (order) => ({
  type: REMOVE_ORDER,
  order,
});

export const applyPromoCode = (code) => ({
  type: APPLY_PROMO_CODE,
  payload: code,
});

export const selectDeliveryMethod = (paymentMethod) => ({
  type: SELECT_DELIVERY_METHOD,
  paymentMethod,
});

export const fetchOrdersByUserId = (userId) => {
  return async (dispatch) => {
    try {
      const { data: orders } = await axios.get(`/api/order/user/${userId}`);
      dispatch(getOrders(orders));
    } catch (error) {
      console.error("fetchOrdersByUserId thunk error", error);
    }
  };
};

export const fetchOrderDetails = (orderId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/order/${orderId}`);
      dispatch(getOrder(data)); // Ensure data includes LineItems
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };
};

export const addOrder = (userId, order) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/order/user/${userId}/`, order);
      dispatch(addOrder_(response.data));
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
};

export default function orders(state = initialState, action) {
  switch (action.type) {
    case GOT_ORDERS:
      return { ...state, orders: action.orders };
    case GOT_ORDER:
      return { ...state, order: action.order };
    case ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.order],
      };
    case REMOVE_ORDER:
      return { ...state, orders: action.orders };
    case APPLY_PROMO_CODE:
      const discount = calculateDiscount(state.subtotal, action.payload);
      return {
        ...state,
        discount,
        promoCode: action.payload,
      };
    case SELECT_DELIVERY_METHOD:
      // Assuming 'home' delivery adds a fee
      const deliveryFee = action.payload === "home" ? 10 : 0;
      return {
        ...state,
        deliveryMethod: action.payload,
        deliveryFee,
      };
    default:
      return state;
  }
}
