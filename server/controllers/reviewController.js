//reviewController
const ReviewService = require("../services/reviewService");
const { PopupStore, User } = require("../models");

//리뷰 생성 POST
const createReview = async (req, res, next) => {
    try {
        //리뷰 정보 저장
        const reviewService = new ReviewService();
        const newReview = await reviewService.createReview(req.body);

        //생성된 예약 정보 응답
        res.status(201).json(newReview);
    } catch (err) {
        next(err);
    }
};

//리뷰 수정
const updateReview = async (req, res, next) => {
    try {
        const reviewService = new ReviewService();
        const updatedReview = await reviewService.updateReview(req.params.id, req.body);
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
        const deletedReview = await reviewService.deleteReview(req.params.id, req.body);
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

module.exports = {
    createReview,
    getAllReviews,
    updateReview,
    deleteReview,
};
