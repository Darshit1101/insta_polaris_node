// src/redux/postSaga.js

import { call, put, takeEvery } from "redux-saga/effects";
import {
  UPLOAD_POST_REQUEST,
  uploadPostSuccess,
  uploadPostFailure,
} from "../ducks/UploadPost"; // Ensure this path is correct

function* uploadPost(action) {
  const { body, image, userId } = action.payload;

  try {
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

    // Check if response is successful
    if (!response.ok) {
      throw new Error("Failed to upload image");
    }

    // Parse response JSON
    const responseData = yield response.json();

    // Create post after setting the URL
    const postResponse = yield call(fetch, "http://localhost:5000/createPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        body,
        pic: responseData.url,
        postedBy: userId,
      }),
    });

    const postData = yield postResponse.json();

    if (postResponse.ok) {
      yield put(uploadPostSuccess(postData));
    } else {
      yield put(uploadPostFailure(postData.error));
    }
  } catch (error) {
    yield put(uploadPostFailure(error.message));
  }
}

function* watchUploadPost() {
  yield takeEvery(UPLOAD_POST_REQUEST, uploadPost);
}

export default watchUploadPost;
