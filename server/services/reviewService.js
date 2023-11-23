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
}

module.exports = ReviewService;
