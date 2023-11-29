//reviewRouter
const { Router } = require("express");

const {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewById,
  getMyReview,
} = require("../controllers/reviewController");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.get("/getMyReview", validateToken, getMyReview);
router.post("/createReview", validateToken, createReview);
router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.put("/updateReview", validateToken, updateReview);
router.delete("/deleteReview/:id", validateToken, deleteReview);

module.exports = router;
