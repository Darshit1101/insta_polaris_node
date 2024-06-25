import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_POSTS_REQUEST,
  fetchPostsSuccess,
  fetchPostsFailure,
  LIKE_POST_REQUEST,
  likePostSuccess,
  likePostFailure,
} from "../ducks/Home";
let jwt = localStorage.getItem("token");

function* fetchPostsSaga() {
  try {
    const response = yield call(axios.get, "http://localhost:5000/getpost", {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* likePostSaga(action) {
  const { userId, postId } = action.payload;
  let jwt = localStorage.getItem("token");

  try {
    const response = yield call(fetch, `http://localhost:5000/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ userId, postId }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = yield response.json();
    yield put(likePostSuccess(data));
  } catch (error) {
    yield put(likePostFailure(error.message));
  }
}

function* watchFetchPosts() {
  yield takeLatest(FETCH_POSTS_REQUEST, fetchPostsSaga);
  yield takeLatest(LIKE_POST_REQUEST, likePostSaga);
}

export default watchFetchPosts;
