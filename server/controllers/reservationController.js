const ReservationService = require("../services/reservationService");

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
const getReservationByCorpAdmin = async (req, res) => {
  try {
    const popupStoreId = req.corpAdminPopupId;

    const reservationService = new ReservationService();
    const reservationList = await reservationService.getReservationByCorpAdmin(
      popupStoreId
    );

    res.status(200).json({ data: reservationList, message: "통신 성공" });
  } catch (error) {
    console.error("Error in getReservationsByPopupStoreId:", error);
    res
      .status(500)
      .json({ error: "팝업스토어에 대한 사전예약 리스트 조회 실패" });
  }
};

//예약 완료
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
      return res.status(404).json({ message: "Reservation not found" });
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
      req.params.id,
      req.body
    );
    if (!deletedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ message: "Reservation deleted" });
  } catch (err) {
    next(err);
  }
};

const getMyReservation = async (req, res, next) => {
  const email = req.decoded.user.email;
  const reservationService = new ReservationService();
  const myReservation = await reservationService.getMyReservation(email);

  res.status(200).json({ data: myReservation });
};

module.exports = {
  createReservation,
  getAllReservations,
  getReservationByCorpAdmin,
  updateReservation,
  deleteReservation,
  enterReservation,
  getMyReservation,
};
