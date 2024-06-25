// actions
export const FETCH_POSTS_REQUEST = "FETCH_POSTS_REQUEST";
export const FETCH_POSTS_SUCCESS = "FETCH_POSTS_SUCCESS";
export const FETCH_POSTS_FAILURE = "FETCH_POSTS_FAILURE";

// like actions
export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

// action creators
export const fetchPostsRequest = () => ({
  type: FETCH_POSTS_REQUEST,
});

export const fetchPostsSuccess = (posts) => ({
  type: FETCH_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFailure = (error) => ({
  type: FETCH_POSTS_FAILURE,
  payload: error,
});

// like action creators
export const likePostRequest = (userId, postId) => ({
  type: LIKE_POST_REQUEST,
  payload: { userId, postId },
});

export const likePostSuccess = (post) => ({
  type: LIKE_POST_SUCCESS,
  payload: post,
});

export const likePostFailure = (error) => ({
  type: LIKE_POST_FAILURE,
  payload: error,
});

// initial state
const initialState = {
  loading: false,
  posts: [],
  error: null,
};

// reducer
const getHomepostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
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

    case LIKE_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    case LIKE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getHomepostReducer;
