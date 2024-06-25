// src/ducks/ChangePassword.js
export const CHANGE_PASSWORD_REQUEST = "CHANGE_PASSWORD_REQUEST";
export const CHANGE_PASSWORD_SUCCESS = "CHANGE_PASSWORD_SUCCESS";
export const CHANGE_PASSWORD_FAILURE = "CHANGE_PASSWORD_FAILURE";

export const changePasswordRequest = (userData) => ({
  type: CHANGE_PASSWORD_REQUEST,
  payload: userData,
});

export const changePasswordSuccess = (message) => ({
  type: CHANGE_PASSWORD_SUCCESS,
  payload: message,
});

export const changePasswordFailure = (error) => ({
  type: CHANGE_PASSWORD_FAILURE,
  payload: error,
});

const initialState = {
  loading: false,
  message: "",
  error: null,
};

const changePasswordReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_REQUEST:
      return { ...state, loading: true, error: null };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case CHANGE_PASSWORD_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default changePasswordReducer;
