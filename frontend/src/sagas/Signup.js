// src/redux/sagas.js
import { call, put, takeLatest } from "redux-saga/effects";
import { SIGNUP_REQUEST, signupSuccess, signupFailure } from "../ducks/Signup";

function* signupSaga(action) {
  try {
    const { name, email, password, image } = action.payload;

    // Create FormData object and append image file
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "darshit123");

    // Send POST request to Cloudinary
    const response = yield call(
      fetch,
      "https://api.cloudinary.com/v1_1/darshit123/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    const responseData = yield response.json();
    const imageUrl = responseData.url;

    const result = yield call(fetch, "http://localhost:5000/register", {
      method: "post",
      body: JSON.stringify({ name, email, password, pic: imageUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const resultData = yield result.json();

    if (resultData.user.name) {
      localStorage.setItem("Register", true);
      yield put(signupSuccess("Registration successful"));
      yield call(() => (window.location.href = "/login")); // Navigate to login page
    } else {
      yield put(signupFailure("Registration failed. Please try again."));
    }
  } catch (error) {
    yield put(signupFailure(error.message));
  }
}

function* watchSignup() {
  yield takeLatest(SIGNUP_REQUEST, signupSaga);
}

export default watchSignup;
