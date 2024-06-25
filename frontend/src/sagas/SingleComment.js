// sagas.js
import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import {
  FETCH_SINGLE_COMMENT_REQUEST,
  fetchSingleCommentSuccess,
  fetchSingleCommentFailure,
  UPDATE_COMMENT_REQUEST,
  updateCommentSuccess,
  updateCommentFailure,
} from "../ducks/SingleComment";

function* fetchSingleCommentSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/comment/${action.payload}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    yield put(fetchSingleCommentSuccess(response.data.comment));
  } catch (error) {
    yield put(fetchSingleCommentFailure(error.message));
  }
}

function* updateCommentSaga(action) {
  try {
    const response = yield call(
      axios.put,
      `http://localhost:5000/comment/${action.payload.commentId}`,
      { text: action.payload.text },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    yield put(updateCommentSuccess(response.data.updatedComment));
  } catch (error) {
    yield put(updateCommentFailure(error.message));
  }
}

function* rootSaga() {
  yield takeEvery(FETCH_SINGLE_COMMENT_REQUEST, fetchSingleCommentSaga);
  yield takeEvery(UPDATE_COMMENT_REQUEST, updateCommentSaga);
}

export default rootSaga;
