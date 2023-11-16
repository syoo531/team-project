const { Router } = require("express");
const { login } = require("../controllers/userController");

const router = Router();

router.post("/login", login);

module.exports = router;
