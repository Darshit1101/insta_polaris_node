// src/sagas/userSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  UPDATE_USER_REQUEST,
  updateUserSuccess,
  updateUserFailure,
} from "../ducks/UpdateProfile";
import { fetchUserRequest } from "../ducks/Navbar";
import axios from "axios";

function* updateUserSaga(action) {
  try {
    const { userId, name, email, Photo } = action.payload;

    // Upload image to Cloudinary
    const formData = new FormData();
    formData.append("file", Photo);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloud_name", "darshit123");

    const cloudinaryResponse = yield call(
      fetch,
      "https://api.cloudinary.com/v1_1/darshit123/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    if (!cloudinaryResponse.ok) {
      throw new Error("Failed to upload image");
    }

    const cloudinaryData = yield cloudinaryResponse.json();
    const imageUrl = cloudinaryData.url;

    // Update user profile
    const response = yield call(
      axios.put,
      `http://localhost:5000/users/${action.payload.userId}`,
      {
        name,
        email,
        Photo: imageUrl,
      }
    );

    // Remove password from response data before saving to localStorage
    const { password, ...userDataWithoutPassword } = response.data;
    console.log("userDataWithoutPassword", userDataWithoutPassword);
    yield put(updateUserSuccess(userDataWithoutPassword));
    yield put(fetchUserRequest(userId));
    localStorage.setItem("user", JSON.stringify(userDataWithoutPassword));
  } catch (error) {
    yield put(updateUserFailure(error.message));
  }
}

function* userSaga() {
  yield takeLatest(UPDATE_USER_REQUEST, updateUserSaga);
}
export default userSaga;
