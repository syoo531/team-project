//reviewController
const ReviewService = require("../services/reviewService");
const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ConflictError,
} = require("../config/customError");

//리뷰 생성 POST
const createReview = async (req, res, next) => {
  try {
    const { popupStoreId } = req.body;
    const { text, image } = req.body;
    const email = req.decoded.user.email;
    const reviewService = new ReviewService();
    const validateUser = await reviewService.validateUser(email, popupStoreId);

    if (!validateUser) {
      throw new Error("해당 팝업스토어의 리뷰를 쓸 권한이 없습니다.");
    }

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
  const email = req.decoded.user.email;
  const newReview = req.body.formData;
  const reviewID = req.body.reviewID;

  try {
    const reviewService = new ReviewService();
    const updatedReview = await reviewService.updateReview(
      email,
      reviewID,
      newReview
    );
    if (!updatedReview) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
};

//리뷰 삭제
const deleteReview = async (req, res, next) => {
  const email = req.decoded.user.email;
  const reviewID = req.params.id;

  try {
    const reviewService = new ReviewService();
    const deletedReview = await reviewService.deleteReview(email, reviewID);
    if (deletedReview === "notFound") {
      throw new NotFoundError("조회되는 리뷰가 없습니다.");
    }
    if (deletedReview === "notMyReview") {
      throw new NotFoundError("작성자가 다릅니다.");
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

//특정 팝업스토어에 대한 리뷰 조회
const getReviewByPopupstore = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const reviewService = new ReviewService();
    const popupStoreReview = await reviewService.getReviewByPopupstore(
      req.params.id,
      page,
      limit
    );
    res.status(200).json(popupStoreReview);
  } catch (err) {
    next(err);
  }
};

// 내 리뷰 조회
const getMyReview = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;
    const reviewService = new ReviewService();
    const review = await reviewService.getMyReview(email);
    if (!review) {
      throw new NotFoundError("조회되는 리뷰가 없습니다!");
    }
    res.status(200).json({ data: review, message: "리뷰조회 성공" });
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
  getReviewByPopupstore,
  getMyReview,
};
