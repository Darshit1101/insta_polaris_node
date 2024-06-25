// src/sagas/likesSaga.js

import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_LIKES_REQUEST,
  fetchLikesSuccess,
  fetchLikesFailure,
} from "../ducks/Like";
import axios from "axios";

function* fetchLikesSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/likes/${action.payload.postId}`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    const { likesCount, likes } = response.data;
    console.log("Likes data:", response.data);
    yield put(
      fetchLikesSuccess({ postId: action.payload.postId, likesCount, likes })
    );
  } catch (error) {
    yield put(fetchLikesFailure(error.message));
  }
}

function* likesSaga() {
  yield takeLatest(FETCH_LIKES_REQUEST, fetchLikesSaga);
}

export default likesSaga;
