//reviewService
const { Review, User, PopupStore, Reservation, Waiting } = require("../models");

class ReviewService {
    //리뷰 생성
    async createReview({ userId, popupStoreId, text }) {
        const userName = await User.findOne({ user: userId }).select("name -_id");
        const popupName = await PopupStore.findOne({ popup_store: popupStoreId }).select("_id");
        const newReviewData = {
            name: userName,
            popup_store: popupName,
            text,
            // image,
        };

        const createdReview = await Review.create(newReviewData);
        return createdReview;
    }
    //유저구분
    async validateUser(userId) {
        try {
            const reservationUserId = await Reservation.findOne({ userId }).select("user -_id");
            const waitingUserId = await Waiting.findOne({ userId }).select("user -_id");

            console.log("reservationUserId :", reservationUserId);
            console.log("waitingUserId :", waitingUserId);

            //reservationUserId에도없고 waitingUserId에도 존재하지 않을때
            if (!reservationUserId && !waitingUserId) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            next(err);
        }
    }

    //모든 리뷰 조회
    async getAllReviews() {
        return await Review.find().populate("popup_store").populate("user");
    }

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
