//reviewRouter

const { Router } = require("express");

const { createReview, getAllReviews } = require("../controllers/reviewController");

const router = Router();

router.post("/", createReview);
router.get("/", getAllReviews);

module.exports = router;
