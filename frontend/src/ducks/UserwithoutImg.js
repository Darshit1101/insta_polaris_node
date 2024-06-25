// src/ducks/userWithoutImageActionTypes.js

export const UPDATE_USER_WITHOUT_IMAGE_REQUEST =
  "UPDATE_USER_WITHOUT_IMAGE_REQUEST";
export const UPDATE_USER_WITHOUT_IMAGE_SUCCESS =
  "UPDATE_USER_WITHOUT_IMAGE_SUCCESS";
export const UPDATE_USER_WITHOUT_IMAGE_FAILURE =
  "UPDATE_USER_WITHOUT_IMAGE_FAILURE";

export const updateUserWithoutImageRequest = (userData) => ({
  type: UPDATE_USER_WITHOUT_IMAGE_REQUEST,
  payload: userData,
});

export const updateUserWithoutImageSuccess = (user) => ({
  type: UPDATE_USER_WITHOUT_IMAGE_SUCCESS,
  payload: user,
});

export const updateUserWithoutImageFailure = (error) => ({
  type: UPDATE_USER_WITHOUT_IMAGE_FAILURE,
  payload: error,
});

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const userWithoutImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_USER_WITHOUT_IMAGE_REQUEST:
      return { ...state, loading: true, error: null };
    case UPDATE_USER_WITHOUT_IMAGE_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case UPDATE_USER_WITHOUT_IMAGE_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default userWithoutImageReducer;
