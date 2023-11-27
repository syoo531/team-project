//reviewService
const { Review, User, PopupStore, Reservation, Waiting } = require("../models");

class ReviewService {
  //리뷰 생성
  async createReview({ userId, popupStoreId, text }) {
    console.log("userId: ", userId);
    console.log("popupStoreId: ", popupStoreId);
    const userName = await User.findOne({ _id: userId });
    const popupName = await PopupStore.findOne({ _id: popupStoreId });
    // console.log("User: ", User);
    // console.log("PopupStore: ", PopupStore);
    console.log("userName._id: ", userName._id);
    console.log("popupName._id: ", popupName._id);
    console.log("popupName: ", popupName);

    const newReviewData = {
      popup_store: popupName._id,
      user: userName._id,
      name: userName.name,
      text,
      // image,
    };

    const createdReview = await Review.create(newReviewData);
    return createdReview;
  }

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

  //모든 리뷰 조회
  async getAllReviews() {
    return await Review.find().populate("popup_store").populate("user");
  }

  //리뷰 수정
  async updateReview(id, data) {
    return await Review.findByIdAndUpdate(id, data, { new: true })
      .populate("popup_store")
      .populate("user");
  }

  //리뷰 삭제
  async deleteReview(id) {
    return await Review.findByIdAndDelete(id);
  }

  // 특정 리뷰 조회
  async getReviewById(reviewId) {
    const review = await Review.findById(reviewId)
      .populate("popup_store")
      .populate("user");

    if (!review) {
      throw new Error("Review not found");
    }

    return review;
  }
}

module.exports = ReviewService;
