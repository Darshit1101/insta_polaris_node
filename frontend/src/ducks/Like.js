// actions.js

export const FETCH_LIKES_REQUEST = "FETCH_LIKES_REQUEST";
export const FETCH_LIKES_SUCCESS = "FETCH_LIKES_SUCCESS";
export const FETCH_LIKES_FAILURE = "FETCH_LIKES_FAILURE";

export const fetchLikesRequest = (postId) => ({
  type: FETCH_LIKES_REQUEST,
  payload: { postId },
});

export const fetchLikesSuccess = (data) => ({
  type: FETCH_LIKES_SUCCESS,
  payload: data,
});

export const fetchLikesFailure = (error) => ({
  type: FETCH_LIKES_FAILURE,
  payload: error,
});

// likesReducer.js

const initialState = {
  likesCount: {}, // Store likesCount by postId
  likes: [],
  error: null,
};

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIKES_SUCCESS:
      return {
        ...state,
        likesCount: {
          ...state.likesCount,
          [action.payload.postId]: action.payload.likesCount,
        },
        likes: action.payload.likes,
      };
    case FETCH_LIKES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default likesReducer;
