// src/sagas/changePasswordSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  CHANGE_PASSWORD_REQUEST,
  changePasswordSuccess,
  changePasswordFailure,
} from "../ducks/Password";

function* changePasswordSaga(action) {
  try {
    const response = yield call(
      fetch,
      "http://localhost:5000/change-password",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(action.payload),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to change password");
    }

    const data = yield response.json();
    yield put(changePasswordSuccess(data.message));
  } catch (error) {
    yield put(changePasswordFailure(error.message));
  }
}

function* watchChangePassword() {
  yield takeLatest(CHANGE_PASSWORD_REQUEST, changePasswordSaga);
}

export default watchChangePassword;
