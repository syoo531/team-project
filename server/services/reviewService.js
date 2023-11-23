//reviewService
const { Review } = require("../models");

class ReviewService {
    //리뷰 생성
    async createReview({ popup_store, user, title, text, image }) {
        const newReviewData = {
            popup_store,
            user,
            title,
            text,
            image,
        };

        const createdReview = await Review.create(newReviewData);
        return createdReview;
    }

    //모든 리뷰 조회
    async getAllReviews() {
        return await Review.find().populate("popup_store").populate("user");
    }
}

module.exports = ReviewService;
