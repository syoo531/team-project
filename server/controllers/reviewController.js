//reviewController
const ReviewService = require("../services/reviewService");
const { PopupStore, User } = require("../models");

//리뷰 생성 POST
const createReview = async (req, res, next) => {
  try {
    const { popupStoreId } = req.body;
    const { text, image } = req.body;
    const email = req.decoded.user.email;
    const reviewService = new ReviewService();
    const validateUser = await reviewService.validateUser(email, popupStoreId);

    console.log("validateUser :", validateUser); // true
    if (!validateUser) {
      throw new Error("해당 팝업스토어의 리뷰를 쓸 권한이 없습니다.");
    }

    // console.log("controller userId: ", userId);

    console.log("controller popupStoreId: ", popupStoreId);

    const newReview = await reviewService.createReview({
      email,
      popupStoreId,
      text,
      image,
    });

    return res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
};

//리뷰 수정
const updateReview = async (req, res, next) => {
  try {
    const reviewService = new ReviewService();
    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.json(updatedReview);
  } catch (err) {
    next(err);
  }
};

//리뷰 삭제
const deleteReview = async (req, res, next) => {
  try {
    const reviewService = new ReviewService();
    const deletedReview = await reviewService.deleteReview(
      req.params.id,
      req.body
    );
    if (!deletedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(204).json({ message: "Review deleted" });
  } catch (err) {
    next(err);
  }
};

//모든 리뷰 조회 GET
const getAllReviews = async (req, res, next) => {
  try {
    const reviewService = new ReviewService();
    const reviews = await reviewService.getAllReviews();
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// 특정 리뷰 조회
const getReviewById = async (req, res, next) => {
  try {
    const reviewService = new ReviewService();
    const review = await reviewService.getReviewById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "review not found" });
    }
    res.json(review);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReview,
  getAllReviews,
  updateReview,
  deleteReview,
  getReviewById,
};
