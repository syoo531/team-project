const { Router } = require("express");
const { login, signup, kakaoAuth } = require("../controllers/userController");

const router = Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/auth/kakao", kakaoAuth);

module.exports = router;
