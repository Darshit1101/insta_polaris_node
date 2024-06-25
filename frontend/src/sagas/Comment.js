import { call, put, takeLatest } from "redux-saga/effects";
import {
  COMMENT_POST_REQUEST,
  commentPostSuccess,
  commentPostFailure,
  FETCH_COMMENTS_FOR_POST_REQUEST,
  fetchCommentsForPostSuccess,
  fetchCommentsForPostFailure,
} from "../ducks/Comment";
import axios from "axios";
const jwt = localStorage.getItem("token");

function* commentPostSaga(action) {
  try {
    const { postId, userId, text } = action.payload;
    yield call(
      axios.post,
      "http://localhost:5000/comment",
      {
        postId,
        userId,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    yield put(commentPostSuccess());
  } catch (error) {
    yield put(commentPostFailure(error.message));
  }
}

function* fetchCommentsForPostSaga(action) {
  try {
    const postId = action.payload;
    const response = yield call(
      axios.get,
      `http://localhost:5000/comments/${postId}`
    );
    yield put(fetchCommentsForPostSuccess(response.data));
  } catch (error) {
    yield put(fetchCommentsForPostFailure(error.message));
  }
}

function* commentsSaga() {
  yield takeLatest(COMMENT_POST_REQUEST, commentPostSaga);
  yield takeLatest(FETCH_COMMENTS_FOR_POST_REQUEST, fetchCommentsForPostSaga);
}

export default commentsSaga;
