const ReservationService = require("../services/reservationService");
const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ConflictError,
} = require("../config/customError");

// 예약 생성
const createReservation = async (req, res, next) => {
  try {
    const { date, hour, people, popup_store } = req.body;
    const email = req.decoded.user.email;
    const reservationService = new ReservationService();
    const newReservation = await reservationService.createReservation({
      date,
      hour,
      people,
      popup_store,
      email,
    });

    // 생성된 예약 정보 응답
    res.status(200).json(newReservation);
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
    if (!reservations) {
      throw new NotFoundError("조회되는 예약이 없습니다!");
    }

    res.json(reservations);
  } catch (err) {
    next(err);
  }
};

// 특정 예약 조회
const getReservationByCorpAdmin = async (req, res) => {
  try {
    const popupStoreId = req.corpAdminPopupId;

    const reservationService = new ReservationService();
    const reservationList = await reservationService.getReservationByCorpAdmin(
      popupStoreId
    );
    if (!reservationList) {
      throw new NotFoundError("조회되는 예약이 없습니다!");
    }

    res.status(200).json({ data: reservationList, message: "통신 성공" });
  } catch (error) {
    next(error);
  }
};

//사전예약 입장 완료
const enterReservation = async (req, res, next) => {
  try {
    const popupStoreId = req.corpAdminPopupId;
    const { userId } = req.body;
    const reservationService = new ReservationService();
    const completedReservation = await reservationService.enterReservation(
      popupStoreId,
      userId
    );
    if (!completedReservation) {
      throw new InternalServerError("입장 처리가 실패하였습니다.");
    }
    res.status(200).json({ message: "사전예약자 입장이 완료되었습니다." });
  } catch (error) {
    next(error);
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
      throw new NotFoundError("조회되는 예약이 없습니다!");
    }
    res.status(200).json(updatedReservation);
  } catch (err) {
    next(err);
  }
};

// 예약 삭제
const deleteReservation = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;
    const id = req.params.id;
    const reservationService = new ReservationService();
    const deletedReservation = await reservationService.deleteReservation(
      email,
      id
    );
    if (!deletedReservation) {
      throw new NotFoundError("조회되는 예약이 없습니다!");
    }
    res.status(200).json({ message: "Reservation deleted" });
  } catch (err) {
    next(err);
  }
};

const getMyReservation = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;
    const reservationService = new ReservationService();
    const myReservation = await reservationService.getMyReservation(email);
    if (!myReservation) {
      throw new NotFoundError("조회되는 예약이 없습니다!");
    }

    res.status(200).json({ data: myReservation });
  } catch (error) {
    next(error);
  }
};

const validateCorp = async (req, res) => {
  res.status(200).json({ message: "관리자 인증 성공" });
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationByCorpAdmin,
  updateReservation,
  deleteReservation,
  enterReservation,
  getMyReservation,
  validateCorp,
};
