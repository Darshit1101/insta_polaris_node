// Actions
export const FETCH_USER_REQUEST = "FETCH_USER_REQUEST";
export const FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS";
export const FETCH_USER_FAILURE = "FETCH_USER_FAILURE";

export const fetchUserRequest = (userId) => ({
  type: FETCH_USER_REQUEST,
  userId,
});

export const fetchUserSuccess = (user) => ({
  type: FETCH_USER_SUCCESS,
  user,
});

export const fetchUserFailure = (error) => ({
  type: FETCH_USER_FAILURE,
  error,
});

// Reducer
const initialState = {
  loading: false,
  user: null,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_USER_SUCCESS:
      return { ...state, loading: false, user: action.user };
    case FETCH_USER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default userReducer;
