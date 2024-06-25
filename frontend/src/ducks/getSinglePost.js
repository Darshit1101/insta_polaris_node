export const FETCH_POST_BY_ID_REQUEST = "FETCH_POST_BY_ID_REQUEST";
export const FETCH_POST_BY_ID_SUCCESS = "FETCH_POST_BY_ID_SUCCESS";
export const FETCH_POST_BY_ID_FAILURE = "FETCH_POST_BY_ID_FAILURE";
export const UPLOAD_IMAGE_REQUEST = "UPLOAD_IMAGE_REQUEST";
export const UPLOAD_IMAGE_SUCCESS = "UPLOAD_IMAGE_SUCCESS";
export const UPLOAD_IMAGE_FAILURE = "UPLOAD_IMAGE_FAILURE";
export const UPDATE_POST_REQUEST = "UPDATE_POST_REQUEST";
export const UPDATE_POST_SUCCESS = "UPDATE_POST_SUCCESS";
export const UPDATE_POST_FAILURE = "UPDATE_POST_FAILURE";

export const fetchPostByIdRequest = (postId) => ({
  type: FETCH_POST_BY_ID_REQUEST,
  payload: { postId },
});

export const fetchPostByIdSuccess = (post) => ({
  type: FETCH_POST_BY_ID_SUCCESS,
  payload: post,
});

export const fetchPostByIdFailure = (error) => ({
  type: FETCH_POST_BY_ID_FAILURE,
  payload: error,
});

export const uploadImageRequest = (image, postId, body) => ({
  type: UPLOAD_IMAGE_REQUEST,
  payload: { image, postId, body },
});

export const uploadImageSuccess = (url) => ({
  type: UPLOAD_IMAGE_SUCCESS,
  payload: url,
});

export const uploadImageFailure = (error) => ({
  type: UPLOAD_IMAGE_FAILURE,
  payload: error,
});

export const updatePostRequest = (postId, postData) => ({
  type: UPDATE_POST_REQUEST,
  payload: { postId, postData },
});

export const updatePostSuccess = (post) => ({
  type: UPDATE_POST_SUCCESS,
  payload: post,
});

export const updatePostFailure = (error) => ({
  type: UPDATE_POST_FAILURE,
  payload: error,
});

const initialState = {
  post: null,
  loading: false,
  error: null,
};

const uppostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POST_BY_ID_REQUEST:
    case UPLOAD_IMAGE_REQUEST:
    case UPDATE_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_POST_BY_ID_SUCCESS:
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        post: action.payload,
        loading: false,
        error: null,
      };
    case FETCH_POST_BY_ID_FAILURE:
    case UPLOAD_IMAGE_FAILURE:
    case UPDATE_POST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default uppostReducer;
