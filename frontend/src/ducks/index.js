import { combineReducers } from "redux";
import signupReducer from "./Signup";
import authReducer from "./Login";
import userReducer from "./Navbar";
import postReducer from "./UploadPost";
import getHomepostReducer from "./Home";
import profileReducer from "./Profile";
import updateReducer from "./UpdateProfile";
import changePasswordReducer from "./Password";
import getSinglePost from "./getSinglePost";
import likesReducer from "./Like";
import commentsReducer from "./Comment";
import singleCommentReducer from "./SingleComment";
import userWithImageReducer from "./UserImage";
import userWithoutImageReducer from "./UserwithoutImg";

const rootReducer = combineReducers({
  signup: signupReducer,
  auth: authReducer,
  user: userReducer,
  post: postReducer,
  home: getHomepostReducer,
  profile: profileReducer,
  proupdate: updateReducer,
  changePassword: changePasswordReducer,
  getSinglePost: getSinglePost,
  likes: likesReducer,
  comment: commentsReducer,
  singlecomment: singleCommentReducer,
  userWithImage: userWithImageReducer,
  userWithoutImage: userWithoutImageReducer,
});

export default rootReducer;
