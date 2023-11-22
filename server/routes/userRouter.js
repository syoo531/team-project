const { Router } = require("express");
const {
  login,
  signup,
  kakaoAuth,
  oAuthSignup,
  googleAuth,
} = require("../controllers/userController");

const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/auth/kakao/check", kakaoAuth);

router.post("/auth/google/check", googleAuth);

router.post("/auth/signup", oAuthSignup);

module.exports = router;
