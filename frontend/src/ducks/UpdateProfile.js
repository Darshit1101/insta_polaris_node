// src/ducks/user.js

export const UPDATE_USER_REQUEST = "UPDATE_USER_REQUEST";
export const UPDATE_USER_SUCCESS = "UPDATE_USER_SUCCESS";
export const UPDATE_USER_FAILURE = "UPDATE_USER_FAILURE";

export const updateUserRequest = (userData) => ({
  type: UPDATE_USER_REQUEST,
  payload: userData,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFailure = (error) => ({
  type: UPDATE_USER_FAILURE,
  payload: error,
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const updateReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UPDATE_USER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default updateReducer;
