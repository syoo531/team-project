//reviewService
const { Review, User, PopupStore, Reservation, Waiting } = require("../models");
class ReviewService {
    // //유저구분
    async validateUser(email, popupStoreId) {
        try {
            const findUserId = await User.findOne({ email }).select("_id");
            const reservationUserId = await Reservation.findOne({
                user: findUserId,
                popup_store: popupStoreId,
            });
            const waitingUserId = await Waiting.findOne({
                user: findUserId,
                popup_store: popupStoreId,
            });

            console.log("findUserId: ", findUserId);
            console.log("reservationUserId :", reservationUserId);
            console.log("waitingUserId :", waitingUserId);

            //reservationUserId에도없고 waitingUserId에도 존재하지 않을때
            // 하나라도 id를 찾았을때
            if (!reservationUserId && !waitingUserId) {
                return false;
            } else {
                return true;
            }
        } catch (err) {
            console.log(err);
        }
    }
    //리뷰 생성
    async createReview({ email, popupStoreId, text, image }) {
        const userName = await User.findOne({ email });
        const popupName = await PopupStore.findOne({ _id: popupStoreId });

        console.log("Server Review Content:", text); // text 값이 제대로 출력되는지 확인
        console.log("IMAGEEEEEE", image);
        const newReviewData = {
            popup_store: popupName._id,
            user: userName._id,
            name: userName.name,
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

    //리뷰 수정
    async updateReview(id, data) {
        return await Review.findByIdAndUpdate(id, data, { new: true }).populate("popup_store").populate("user");
    }

    //리뷰 삭제
    async deleteReview(id) {
        return await Review.findByIdAndDelete(id);
    }

    // 특정 리뷰 조회
    async getReviewById(reviewId) {
        const review = await Review.findById(reviewId).populate("popup_store").populate("user");

        if (!review) {
            throw new Error("Review not found");
        }

        return review;
    }

    async getReviewByPopupstore(storeID, page, limit) {
        const limitPerPage = limit || 5;
        const skipCount = (Number(page) - 1) * limitPerPage;
        const totalReviews = await Review.countDocuments({ popup_store: storeID });

        const popupStoreReview = await Review.find({
            popup_store: storeID,
        })
            .sort({ _id: -1 })
            .limit(limitPerPage)
            .skip(skipCount);

        return {
            reviewData: popupStoreReview,
            totalPages: Math.ceil(totalReviews / limitPerPage),
            currentPage: Number(page) || 1,
            totalReviews,
        };
    }
}

module.exports = ReviewService;
