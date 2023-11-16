const { Router } = require("express");
const { signUp } = require("../controllers/userController");

const router = Router();

router.post("/signup", signUp);

router.post("/login", (req, res) => {});

module.exports = router;
