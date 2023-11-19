const ReservationService = require("../services/reservationService");
const { PopupStore } = require("../models");

// 예약 생성
const createReservation = async (req, res, next) => {
  try {
    // 검증 후 예약 서비스를 통해 예약 생성
    const reservationService = new ReservationService();
    const newReservation = await reservationService.createReservation(req.body);

    // 생성된 예약 정보 응답
    res.status(201).json(newReservation);
  } catch (err) {
    // 에러 처리
    next(err);
  }
};

// 모든 예약 조회
const getAllReservations = async (req, res, next) => {
  try {
    const reservationService = new ReservationService();
    const reservations = await reservationService.getAllReservations();
    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// 특정 예약 조회
const getReservationById = async (req, res, next) => {
  try {
    // 팝업 스토어와 사용자의 존재 여부를 먼저 확인
    const popupStore = await PopupStore.findById(req.body.popup_store);
    if (!popupStore) {
      throw new Error("Popup store not found");
    }

    const user = await User.findById(req.body.user);
    if (!user) {
      throw new Error("User not found");
    }
    const reservationService = new ReservationService();
    const reservation = await reservationService.getReservationById(
      req.params.id
    );
    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(reservation);
  } catch (err) {
    next(err);
  }
};

// 예약 수정
const updateReservation = async (req, res, next) => {
  try {
    const reservationService = new ReservationService();
    const updatedReservation = await reservationService.updateReservation(
      req.params.id,
      req.body
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(updatedReservation);
  } catch (err) {
    next(err);
  }
};

// 예약 삭제
const deleteReservation = async (req, res, next) => {
  try {
    const reservationService = new ReservationService();
    const deletedReservation = await reservationService.deleteReservation(
      req.params.id
    );
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ message: "Reservation deleted" });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
};
