//reviewService
const { Review } = require("../models");

class ReviewService {
    //리뷰 생성
    async createReview({ id, user, title, text, image, created_at }) {
        const newReviewData = {
            id,
            user,
            title,
            text,
            image,
            created_at,
        };

        const createdReview = await Review.create(newReviewData);
        return createdReview;
    }

    //모든 리뷰 조회
    async getAllReviews() {
        return await Review.find().populate("popup_store").populate("user");
    }ㅐ

    //리뷰 수정
    async updateReview(id, data) {
        return await Review.findByIdAndUpdate(id, data, { new: true }).populate("popup_store").populate("user");
    }

    //리뷰 삭제
    async deleteReview(id) {
        return await Review.findByIdAndDelete(id);
    }
}

module.exports = ReviewService;
