import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_POSTS_REQUEST,
  fetchPostsSuccess,
  fetchPostsFailure,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  likePostSuccess,
  likePostFailure,
  unlikePostSuccess,
  unlikePostFailure,
  FETCH_POSTS_BY_COMMENT_TEXT_REQUEST,
  fetchPostsByCommentTextSuccess,
  fetchPostsByCommentTextFailure,
} from "../ducks/Home";

function* fetchPostsSaga(action) {
  const { page, limit } = action.payload;
  let jwt = localStorage.getItem("token");
  try {
    const response = yield call(
      fetch,
      `http://localhost:5000/getpost?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = yield response.json();
    yield put(fetchPostsSuccess(data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* likePost(action) {
  let jwt = localStorage.getItem("token");
  try {
    const response = yield call(
      axios.post,
      "http://localhost:5000/like",
      {
        userId: action.payload.userId,
        postId: action.payload.postId,
      },

      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    // console.log(response.data.likes);
    yield put(likePostSuccess(response.data.likes));
  } catch (error) {
    yield put(likePostFailure(error.message));
  }
}

function* unlikePost(action) {
  let jwt = localStorage.getItem("token");
  try {
    const response = yield call(
      axios.put,
      "http://localhost:5000/unlike",
      {
        userId: action.payload.userId,
        postId: action.payload.postId,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    yield put(unlikePostSuccess(response.data.likes));
  } catch (error) {
    yield put(unlikePostFailure(error.message));
  }
}

function* fetchPostsByCommentTextSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/search?searchKey=${action.payload}`
    );
    yield put(fetchPostsByCommentTextSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsByCommentTextFailure(error.message));
  }
}
function* watchFetchPosts() {
  yield takeLatest(FETCH_POSTS_REQUEST, fetchPostsSaga);
  yield takeLatest(LIKE_POST_REQUEST, likePost);
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
  yield takeLatest(
    FETCH_POSTS_BY_COMMENT_TEXT_REQUEST,
    fetchPostsByCommentTextSaga
  );
}

export default watchFetchPosts;
