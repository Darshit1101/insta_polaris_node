export const COMMENT_POST_REQUEST = "COMMENT_POST_REQUEST";
export const COMMENT_POST_SUCCESS = "COMMENT_POST_SUCCESS";
export const COMMENT_POST_FAILURE = "COMMENT_POST_FAILURE";
// actionTypes.js

export const FETCH_COMMENTS_FOR_POST_REQUEST =
  "FETCH_COMMENTS_FOR_POST_REQUEST";
export const FETCH_COMMENTS_FOR_POST_SUCCESS =
  "FETCH_COMMENTS_FOR_POST_SUCCESS";
export const FETCH_COMMENTS_FOR_POST_FAILURE =
  "FETCH_COMMENTS_FOR_POST_FAILURE";

export const commentPostRequest = (postId, userId, text) => ({
  type: COMMENT_POST_REQUEST,
  payload: { postId, userId, text },
});

export const commentPostSuccess = (comment) => ({
  type: COMMENT_POST_SUCCESS,
  payload: comment,
});

export const commentPostFailure = (error) => ({
  type: COMMENT_POST_FAILURE,
  payload: error,
});
export const fetchCommentsForPostRequest = (postId) => ({
  type: FETCH_COMMENTS_FOR_POST_REQUEST,
  payload: postId,
});

export const fetchCommentsForPostSuccess = (data) => ({
  type: FETCH_COMMENTS_FOR_POST_SUCCESS,
  payload: data,
});

export const fetchCommentsForPostFailure = (error) => ({
  type: FETCH_COMMENTS_FOR_POST_FAILURE,
  payload: error,
});
const initialState = {
  loading: false,
  commentsCount: 0,
  comments: [],
  error: null,
};

const commentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMMENT_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_POST_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case COMMENT_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case FETCH_COMMENTS_FOR_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COMMENTS_FOR_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        commentsCount: action.payload.commentCount,
        comments: action.payload.comments,
        error: null,
      };
    case FETCH_COMMENTS_FOR_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default commentsReducer;
