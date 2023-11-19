import axios from "axios";

const initialState = {
  reviews: [],
  error: null,
};

// Action Types
const GOT_REVIEWS = "GOT_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW"; // For adding a new review
const FETCH_ERROR = "FETCH_ERROR";
const POST_ERROR = "POST_ERROR";

// Action Creators
export const getReviews = (reviews) => ({
  type: GOT_REVIEWS,
  reviews,
});

export const addReviewAction = (review) => ({
  type: ADD_REVIEW,
  review,
});

export const fetchError = (error) => ({
  type: FETCH_ERROR,
  error,
});

export const postError = (error) => ({
  type: POST_ERROR,
  error,
});

// Thunks
export const fetchReviewsByProductId = (productId) => {
  return async (dispatch) => {
    try {
      const { data: reviews } = await axios.get(
        `/api/review/product/${productId}`
      );
      dispatch(getReviews(reviews));
    } catch (error) {
      console.error("fetchReviewsByProductId thunk error", error);
      dispatch(fetchError(error));
    }
  };
};

export const addReview = (productId, review) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        `/api/review/product/${productId}`,
        review,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(addReviewAction(data));
    } catch (error) {
      console.error("addReview thunk error", error);
      dispatch(postError(error));
    }
  };
};

// Reducer
export default function reviews(state = initialState, action) {
  switch (action.type) {
    case GOT_REVIEWS:
      return { ...state, reviews: action.reviews };
    case ADD_REVIEW:
      return { ...state, reviews: [...state.reviews, action.review] };
    case POST_ERROR:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
