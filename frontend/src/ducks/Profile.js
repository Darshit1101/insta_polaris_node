// Action types
export const PROFILE_REQUEST = "PROFILE_REQUEST";
export const PROFILE_SUCCESS = "PROFILE_SUCCESS";
export const PROFILE_FAILURE = "PROFILE_FAILURE";

// Action creators
export const fetchPostsRequest = (userId) => ({
  type: PROFILE_REQUEST,
  payload: userId,
});

export const fetchPostsSuccess = (posts) => ({
  type: PROFILE_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: PROFILE_FAILURE,
  payload: error,
});

const initialState = {
  loading: false,
  posts: [],
  error: null,
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case PROFILE_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case PROFILE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default profileReducer;
