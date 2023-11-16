const { Router } = require("express");

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({ message: "hello!" });
});
router.post("/", (req, res) => {
  console.log(req);
  const { email, password } = req.body;
  res.status(200).json({ message: `${email}` });
});

router.post("/signup", (req, res) => {});

router.post("/login", (req, res) => {});

module.exports = router;
