// src/redux/postModule.js

// Action types
export const UPLOAD_POST_REQUEST = "UPLOAD_POST_REQUEST";
const UPLOAD_POST_SUCCESS = "UPLOAD_POST_SUCCESS";
const UPLOAD_POST_FAILURE = "UPLOAD_POST_FAILURE";

// Action creators
export const uploadPostRequest = (postData) => ({
  type: UPLOAD_POST_REQUEST,
  payload: postData,
});
export const uploadPostSuccess = (post) => ({
  type: UPLOAD_POST_SUCCESS,
  payload: post,
});
export const uploadPostFailure = (error) => ({
  type: UPLOAD_POST_FAILURE,
  payload: error,
});

// Initial state
const initialState = {
  loading: false,
  post: null,
  error: null,
};

// Reducer
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_POST_REQUEST:
      return { ...state, loading: true, error: null };
    case UPLOAD_POST_SUCCESS:
      return { ...state, loading: false, post: action.payload };
    case UPLOAD_POST_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default postReducer;
