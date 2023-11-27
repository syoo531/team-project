const { Router } = require("express");
const {
  login,
  signup,
  kakaoAuth,
  oAuthSignup,
  googleAuth,
  getUserInfo,
  updateUserInfo,
  signOut,
  changePassword,
} = require("../controllers/userController");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/auth/kakao/check", kakaoAuth);

router.post("/auth/google/check", googleAuth);

router.post("/auth/signup", oAuthSignup);

router.get("/getUserInfo", validateToken, getUserInfo);

router.put("/updateUserInfo", validateToken, updateUserInfo);

router.delete("/signout", validateToken, signOut);

router.put("/changePassword", validateToken, changePassword);

module.exports = router;
