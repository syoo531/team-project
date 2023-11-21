const { Router } = require("express");
const {
  login,
  signup,
  kakaoAuth,
  kakaoSignup,
} = require("../controllers/userController");

const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/auth/kakao/check", kakaoAuth);
router.post("/auth/kakao/signup", kakaoSignup);

module.exports = router;
