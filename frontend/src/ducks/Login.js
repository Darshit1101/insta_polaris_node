// src/reducers/Login.js

// Action Types
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

// Action Creators
export const loginRequest = (payload) => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload) => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  error,
});

// Initial State
const initialState = {
  loading: false,
  user: null,
  error: null,
};

// Reducer
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
