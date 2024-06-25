import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  PROFILE_REQUEST,
  fetchPostsSuccess,
  fetchPostsFailure,
} from "../ducks/Profile";

function* fetchPostsSaga(action) {
  const jwt = localStorage.getItem("token");
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/postList/${action.payload}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    yield put(fetchPostsSuccess(response.data));
  } catch (error) {
    yield put(fetchPostsFailure(error.message));
  }
}

function* watchProfile() {
  yield takeLatest(PROFILE_REQUEST, fetchPostsSaga);
}

export default watchProfile;
