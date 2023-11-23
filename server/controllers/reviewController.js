//reviewController
const ReviewService = require("../services/reviewService");
const { PopupStore, User } = require("../models");

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

module.exports = {
    createReview,
};
