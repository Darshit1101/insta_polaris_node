// userRoutes.js
const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  verifyMail,
  changePassword,
} = require("./controller");

router.route("/register").post(registerUser);
router.route("/get-register/:id").get(getUserById);
router.route("/users/:id").put(updateUserById);
router.route("/verify").get(verifyMail);

router.route("/login").post(loginUser);

router.route("/change-password").post(changePassword);

module.exports = router;
