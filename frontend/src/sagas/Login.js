// src/sagas.js

import { call, put, takeEvery } from "redux-saga/effects";
import { LOGIN_REQUEST, loginSuccess, loginFailure } from "../ducks/Login";

function* loginSaga(action) {
  try {
    const response = yield call(fetch, "http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(action.payload),
    });

    const result = yield response.json();

    if (response.ok) {
      const user = { ...result.user }; // Create a copy of the user object
      delete user.password;

      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", result.token);
      localStorage.removeItem("Register");
      localStorage.setItem("login", true);

      yield put(loginSuccess(user));
    } else {
      yield put(loginFailure("Invalid email or password"));
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* watchLoginSaga() {
  yield takeEvery(LOGIN_REQUEST, loginSaga);
}

export default watchLoginSaga;
