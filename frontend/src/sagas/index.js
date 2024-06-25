import { fork } from "redux-saga/effects";
import Signup from "./Signup";
import Login from "./Login";
import Navbar from "./Navbar";
import UploadPost from "./UploadPost";
import Home from "./Home";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./Password";
import getSinglePost from "./getSinglePost";
import getLike from "./Like";
import getComment from "./Comment";
import SingleComment from "./SingleComment";
import UserImg from "./UserImage";
import UserWithoutImg from "./UserwithoutImg";

export default function* rootSaga() {
  yield fork(Signup);
  yield fork(Login);
  yield fork(Navbar);
  yield fork(UploadPost);
  yield fork(Home);
  yield fork(Profile);
  yield fork(UpdateProfile);
  yield fork(ChangePassword);
  yield fork(getSinglePost);
  yield fork(getLike);
  yield fork(getComment);
  yield fork(SingleComment);
  yield fork(UserImg);
  yield fork(UserWithoutImg);
}
