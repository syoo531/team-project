const { Reservation } = require("../models");

class ReservationService {
  // 예약 생성
  async createReservation({ date, hour, people, popup_store, user }) {
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
  async getAllReservations() {
    return await Reservation.find().populate("popup_store").populate("user");
  }

  // 특정 예약 조회
  async getReservationById(id) {
    return await Reservation.findById(id)
      .populate("popup_store")
      .populate("user");
  }

  // 예약 삭제
  async deleteReservation(id) {
    return await Reservation.findByIdAndDelete(id);
  }

  // 예약 수정 (주석 처리된 부분, 필요한 경우 구현)
  // async updateReservation(id, data) {
  //   return await Reservation.findByIdAndUpdate(id, data, { new: true }).populate("popup_store").populate("user");
  // }
}

module.exports = ReservationService;
