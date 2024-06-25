export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const FETCH_POSTS_BY_COMMENT_TEXT_REQUEST =
  "FETCH_POSTS_BY_COMMENT_TEXT_REQUEST";
export const FETCH_POSTS_BY_COMMENT_TEXT_SUCCESS =
  "FETCH_POSTS_BY_COMMENT_TEXT_SUCCESS";
export const FETCH_POSTS_BY_COMMENT_TEXT_FAILURE =
  "FETCH_POSTS_BY_COMMENT_TEXT_FAILURE";

export const fetchPostsRequest = (page, limit) => ({
  type: FETCH_POSTS_REQUEST,
  payload: { page, limit },
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

// export const likePostRequest = (userId, postId) => ({
//   type: LIKE_POST_REQUEST,
//   payload: { userId, postId },
// });
export const likePostRequest = (userId, postId) => {
  // console.log("userId:", userId, "postId:", postId);
  return {
    type: LIKE_POST_REQUEST,
    payload: { userId, postId },
  };
};

export const likePostSuccess = (likes) => ({
  type: LIKE_POST_SUCCESS,
  payload: likes,
});

export const likePostFailure = (error) => ({
  type: LIKE_POST_FAILURE,
  payload: error,
});

export const unlikePostRequest = (userId, postId) => ({
  type: UNLIKE_POST_REQUEST,
  payload: { userId, postId },
});

export const unlikePostSuccess = (likes) => ({
  type: UNLIKE_POST_SUCCESS,
  payload: likes,
});

export const unlikePostFailure = (error) => ({
  type: UNLIKE_POST_FAILURE,
  payload: error,
});

export const fetchPostsByCommentTextRequest = (searchKey) => ({
  type: FETCH_POSTS_BY_COMMENT_TEXT_REQUEST,
  payload: searchKey,
});

export const fetchPostsByCommentTextSuccess = (posts) => ({
  type: FETCH_POSTS_BY_COMMENT_TEXT_SUCCESS,
  payload: posts,
});

export const fetchPostsByCommentTextFailure = (error) => ({
  type: FETCH_POSTS_BY_COMMENT_TEXT_FAILURE,
  payload: error,
});
const initialState = {
  posts: [],
  loading: false,
  error: null,
  // likes: [],
  page: 1,
  limit: 2,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
      };
    case FETCH_POSTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        likes: action.payload,
      };
    case LIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };
    case UNLIKE_POST_SUCCESS:
      return {
        ...state,
        likes: action.payload,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        likes: action.payload,
        // likedByCurrentUser: action.payload.includes(state.currentUser.id),
      };

    case UNLIKE_POST_SUCCESS:
      return {
        ...state,
        likes: action.payload,
        // likedByCurrentUser: action.payload.includes(state.currentUser.id),
      };

    case UNLIKE_POST_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      };

    case FETCH_POSTS_BY_COMMENT_TEXT_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_POSTS_BY_COMMENT_TEXT_SUCCESS:
      return { ...state, loading: false, posts: action.payload };
    case FETCH_POSTS_BY_COMMENT_TEXT_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default homeReducer;
