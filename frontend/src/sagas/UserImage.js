import { call, put, takeLatest } from "redux-saga/effects";
import {
  UPDATE_USER_WITH_IMAGE_REQUEST,
  updateUserWithImageSuccess,
  updateUserWithImageFailure,
} from "../ducks/UserImage";
import { fetchUserRequest } from "../ducks/Navbar";
import axios from "axios";

function* updateUserWithImageSaga(action) {
  try {
    const { userId, name, email, Photo } = action.payload;

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

    const response = yield call(
      axios.put,
      `http://localhost:5000/users/${userId}`,
      {
        name,
        email,
        Photo: imageUrl,
      }
    );
    const { password, ...userDataWithoutPassword } = response.data;
    yield put(updateUserWithImageSuccess(userDataWithoutPassword));
    yield put(fetchUserRequest(userId));
    localStorage.setItem("user", JSON.stringify(userDataWithoutPassword));
  } catch (error) {
    yield put(updateUserWithImageFailure(error.message));
  }
}

function* watchUpdateUserWithImage() {
  yield takeLatest(UPDATE_USER_WITH_IMAGE_REQUEST, updateUserWithImageSaga);
}

export default watchUpdateUserWithImage;
