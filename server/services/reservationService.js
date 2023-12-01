const { Reservation, User } = require("../models");

class ReservationService {
  // 예약 생성
  async createReservation({ date, hour, people, popup_store, email }) {
    const user = await User.findOne({ email }).select("_id");
    const newReservationData = {
      date,
      hour,
      people,
      popup_store,
      user,
    };

    const createdReservation = await Reservation.create(newReservationData);
    return createdReservation;
  }

  // 모든 예약 조회
  async getAllReservations(page, limit) {
    const limitPerPage = limit || 10; // 기본 10개로 제한
    const skipCount = (Number(page) - 1) * limitPerPage; // 페이지에 맞게 건너뛸 항목 수 계산
    const totalReservations = await Reservation.countDocuments({}); // 총 예약 수

    const data = await Reservation.find()
      .sort({ _id: -1 }) // 최신 예약부터 표시
      .limit(limitPerPage) // 페이지당 항목 수 제한
      .skip(skipCount) // 건너뛸 항목 수만큼 건너뛰기
      .populate("popup_store")
      .populate("user");

    return {
      data,
      totalReservations,
      currentPage: Number(page) || 1,
      totalPages: Math.ceil(totalReservations / limitPerPage), // 총 페이지 수 계산
    };
  }

  // 특정 팝업스토어 예약 조회
  async getReservationByCorpAdmin(popupStoreId) {
    return await Reservation.find({
      popup_store: popupStoreId,
    })
      .populate("user")
      .populate("popup_store");
  }

  //예약 완료
  async enterReservation(popupStoreId, userId) {
    const reservation = await Reservation.findOneAndUpdate(
      {
        popup_store: popupStoreId,
        user: userId,
        status: "대기중",
      },
      { status: "완료됨" },
      { new: true }
    );
    return reservation;
  }

  // 예약 삭제
  async deleteReservation(email, id) {
    const user = await User.findOne({ email }).select("_id");

    const deletedReservation = await Reservation.deleteOne({
      popup_store: id,
      user: user,
    });

    return deletedReservation;
  }

  // 예약 수정
  async updateReservation(id, data) {
    return await Reservation.findByIdAndUpdate(id, data, { new: true })
      .populate("popup_store")
      .populate("user");
  }

  async getMyReservation(email) {
    const user = await User.findOne({ email }).select("_id");
    const myReservation = await Reservation.find({ user }).populate({
      path: "popup_store",
      select: ["name", "mainImage", "_id"],
      populate: {
        path: "mainImage",
        select: ["url"],
      },
    });
    return myReservation;
  }

  // 업체 관리자인지 확인
  async validateAdmin(email, popupStoreId) {
    const isAdminUser = await User.findOne({ email }).select("admin_corp");
    console.log("isAdminUser: ", isAdminUser);
    console.log("popupStoreId: ", popupStoreId);

    if (
      isAdminUser.admin_corp === popupStoreId &&
      isAdminUser.admin_corp !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  }
}

module.exports = ReservationService;
