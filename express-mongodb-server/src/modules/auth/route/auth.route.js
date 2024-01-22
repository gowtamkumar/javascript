const express = require("express");
const {
  register,
  login,
  getUsers,
  getMe,
  getUser,
  deleteUser,
  logout,
  forgetPassword,
  forgotPassword,
  resetPassword,
} = require("../controller/auth.controller");
const {
  AuthGuard,
  isAuthorize,
} = require("../../../middlewares/auth.middleware");

const router = express.Router();

router.route("/register").post(register);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/login").post(login);
router.route("/users").get(AuthGuard, isAuthorize, getUsers);
router.route("/me").get(AuthGuard, getMe);
router.route("/users/:id").get(AuthGuard, getUser);
router.route("/users/:id").delete(AuthGuard, deleteUser);
router.route("/logout").delete(logout);

module.exports = router;