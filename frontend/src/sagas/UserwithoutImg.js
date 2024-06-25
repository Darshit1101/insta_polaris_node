import { call, put, takeLatest } from "redux-saga/effects";
import {
  UPDATE_USER_WITHOUT_IMAGE_REQUEST,
  updateUserWithoutImageSuccess,
  updateUserWithoutImageFailure,
} from "../ducks/UserwithoutImg";
import { fetchUserRequest } from "../ducks/Navbar";
import axios from "axios";

function* updateUserWithoutImageSaga(action) {
  try {
    const { userId, name, email } = action.payload;

    const response = yield call(
      axios.put,
      `http://localhost:5000/users/${userId}`,
      {
        name,
        email,
      }
    );

    const { password, ...userDataWithoutPassword } = response.data;
    yield put(updateUserWithoutImageSuccess(userDataWithoutPassword));
    yield put(fetchUserRequest(userId));
    localStorage.setItem("user", JSON.stringify(userDataWithoutPassword));
  } catch (error) {
    yield put(updateUserWithoutImageFailure(error.message));
  }
}

function* watchUpdateUserWithoutImage() {
  yield takeLatest(
    UPDATE_USER_WITHOUT_IMAGE_REQUEST,
    updateUserWithoutImageSaga
  );
}

export default watchUpdateUserWithoutImage;
