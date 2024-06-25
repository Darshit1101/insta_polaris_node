// actionTypes.js
export const FETCH_SINGLE_COMMENT_REQUEST = "FETCH_SINGLE_COMMENT_REQUEST";
export const FETCH_SINGLE_COMMENT_SUCCESS = "FETCH_SINGLE_COMMENT_SUCCESS";
export const FETCH_SINGLE_COMMENT_FAILURE = "FETCH_SINGLE_COMMENT_FAILURE";
// src/redux/actions/commentActions.js
export const UPDATE_COMMENT_REQUEST = "UPDATE_COMMENT_REQUEST";
export const UPDATE_COMMENT_SUCCESS = "UPDATE_COMMENT_SUCCESS";
export const UPDATE_COMMENT_FAILURE = "UPDATE_COMMENT_FAILURE";

export const fetchSingleCommentRequest = (commentId) => ({
  type: FETCH_SINGLE_COMMENT_REQUEST,
  payload: commentId,
});

export const fetchSingleCommentSuccess = (comment) => ({
  type: FETCH_SINGLE_COMMENT_SUCCESS,
  payload: comment,
});

export const fetchSingleCommentFailure = (error) => ({
  type: FETCH_SINGLE_COMMENT_FAILURE,
  payload: error,
});
export const updateCommentRequest = (commentId, text) => ({
  type: UPDATE_COMMENT_REQUEST,
  payload: { commentId, text },
});

export const updateCommentSuccess = (comment) => ({
  type: UPDATE_COMMENT_SUCCESS,
  payload: comment,
});

export const updateCommentFailure = (error) => ({
  type: UPDATE_COMMENT_FAILURE,
  payload: error,
});
const initialState = {
  comment: null,
  isLoading: false,
  error: null,
};

const singleCommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SINGLE_COMMENT_REQUEST:
      return { ...state, isLoading: true };
    case FETCH_SINGLE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comment: action.payload,
        error: null,
      };
    case FETCH_SINGLE_COMMENT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case UPDATE_COMMENT_REQUEST:
      return { ...state, isLoading: true, error: null };
    case UPDATE_COMMENT_SUCCESS:
      return { ...state, isLoading: false, comment: action.payload };
    case UPDATE_COMMENT_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export default singleCommentReducer;
