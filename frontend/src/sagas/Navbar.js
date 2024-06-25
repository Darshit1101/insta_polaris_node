// src/sagas.js

import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_USER_REQUEST,
  fetchUserSuccess,
  fetchUserFailure,
} from "../ducks/Navbar";

function* fetchUserSaga(action) {
  try {
    const response = yield call(
      fetch,
      `http://localhost:5000/get-register/${action.userId}`
    );
    const user = yield response.json();
    if (response.ok) {
      yield put(fetchUserSuccess(user));
    } else {
      yield put(fetchUserFailure("Failed to fetch user data"));
    }
  } catch (error) {
    yield put(fetchUserFailure(error.message));
  }
}

function* watchFetchUser() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserSaga);
}

export default watchFetchUser;
