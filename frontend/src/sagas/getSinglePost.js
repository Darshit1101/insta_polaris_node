import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_POST_BY_ID_REQUEST,
  fetchPostByIdSuccess,
  fetchPostByIdFailure,
  UPLOAD_IMAGE_REQUEST,
  uploadImageSuccess,
  uploadImageFailure,
  UPDATE_POST_REQUEST,
  updatePostSuccess,
  updatePostFailure,
} from "../ducks/getSinglePost"; // Ensure the path is correct
import axios from "axios";

function* fetchPostByIdSaga(action) {
  try {
    const response = yield call(
      axios.get,
      `http://localhost:5000/post/${action.payload.postId}`
    );
    yield put(fetchPostByIdSuccess(response.data));
  } catch (error) {
    yield put(fetchPostByIdFailure(error.message));
  }
}

function* uploadImageSaga(action) {
  try {
    const { image, postId, body } = action.payload;
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "darshit123");

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
    yield put(uploadImageSuccess(responseData.url));

    const token = localStorage.getItem("token");
    const postData = {
      body,
      Photo: responseData.url,
    };

    const updateResponse = yield call(
      axios.put,
      `http://localhost:5000/update/${postId}`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(updatePostSuccess(updateResponse.data));
  } catch (error) {
    yield put(uploadImageFailure(error.message));
  }
}

function* updatePostSaga(action) {
  try {
    const { postId, postData } = action.payload;
    const token = localStorage.getItem("token");
    const response = yield call(
      axios.put,
      `http://localhost:5000/update/${postId}`,
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    yield put(updatePostSuccess(response.data));
  } catch (error) {
    yield put(updatePostFailure(error.message));
  }
}

function* profileSaga() {
  yield takeLatest(FETCH_POST_BY_ID_REQUEST, fetchPostByIdSaga);
  yield takeLatest(UPLOAD_IMAGE_REQUEST, uploadImageSaga);
  yield takeLatest(UPDATE_POST_REQUEST, updatePostSaga);
}

export default profileSaga;
