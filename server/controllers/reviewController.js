//reviewController
const ReviewService = require("../services/reviewService");
const { PopupStore, User } = require("../models");

//리뷰 생성 POST
const createReview = async (req, res, next) => {
    try {
        const { userId, popupStoreId } = req.query;
        const { text } = req.body;
        const reviewService = new ReviewService();
        const validateUser = await reviewService.validateUser(userId);
        console.log("validateUser :", validateUser);
        if (!validateUser) {
            throw new Error("해당 팝업스토어의 리뷰를 쓸 권한이 없습니다.");
        }

        const newReview = await reviewService.createReview({ userId, popupStoreId, text });
        console.log("newReview : ", newReview);
        //리뷰 정보 저장
        //생성된 예약 정보 응답
        return res.status(201).json(newReview);
    } catch (err) {
        // res.status(400).json({ error: "팝업스토어에 대한 리뷰 작성을 실패하였습니다." });
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
