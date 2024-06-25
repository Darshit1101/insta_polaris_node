// Action Types
export const SIGNUP_REQUEST = "SIGNUP_REQUEST";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

// Action Creators
export const signupRequest = (payload) => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const signupSuccess = (payload) => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  error,
});

// Initial State
const initialState = {
  loading: false,
  user: null,
  error: null,
};

// Reducer
const signupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_REQUEST:
      return { ...state, loading: true, error: null };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default signupReducer;
