//reviewRouter

const { Router } = require("express");

const { createReview, getAllReviews, updateReview, deleteReview } = require("../controllers/reviewController");

const router = Router();

router.post("/createReview", createReview);
router.get("/allReview", getAllReviews);
router.patch("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
