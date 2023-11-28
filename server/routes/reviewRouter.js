//reviewRouter
const { Router } = require("express");

const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewById,
} = require("../controllers/reviewController");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.post("/createReview", validateToken, createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.patch("/updateReview/:id", updateReview);
router.delete("/deleteReview/:id", deleteReview);

module.exports = router;
