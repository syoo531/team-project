//reviewRouter

const { Router } = require("express");

const { createReview } = require("../controllers/reviewController");

const router = Router();

router.post("/", createReview);

module.exports = router;
