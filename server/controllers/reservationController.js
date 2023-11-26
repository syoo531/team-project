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
const getReservationsByPopupStoreId = async (req, res) => {
  try {
    const { popupStoreId } = req.query;
    console.log("popupStoreId:", req.query.popupStoreId);

    const reservationService = new ReservationService();
    const users = await reservationService.getReservationsByPopupStoreId(
      popupStoreId
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getReservationsByPopupStoreId:", error);
    res
      .status(500)
      .json({ error: "팝업스토어에 대한 사전예약 리스트 조회 실패" });
  }
};

// const getReservationsByPopupStoreId = async (req, res) => {
//   try {
//     const { popupStoreId } = req.query;
//     console.log("popupStoreId:", req.query.popupStoreId);
//     const email = req.decoded.user.email;

//     const reservationService = new ReservationService();
//     const validate = await reservationService.validateAdmin(
//       email,
//       popupStoreId
//     );
//     console.log("validate: ", validate);
//     if (!validate) {
//       throw new Error("해당 팝업스토어 사전예약 조회 권한이 없습니다.");
//     }
//     const users = await reservationService.getReservationsByPopupStoreId(
//       popupStoreId
//     );
//     res.status(200).json(users);
//   } catch (error) {
//     res
//       .status(200)
//       .json({ error: "팝업스토어에 대한 사전예약 리스트 조회 실패" });
//   }
// };

//예약 완료
async function completeReservation(req, res, next) {
  try {
    const { popupStoreId, userId } = req.body;
    const reservationService = new ReservationService();
    const completedReservation = await reservationService.completeReservation(
      popupStoreId,
      userId
    );
    if (!completedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.status(200).json({ message: "사전 예약이 완료되었습니다." });
  } catch (error) {
    next(error);
  }
}

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

module.exports = {
  createReservation,
  getAllReservations,
  getReservationsByPopupStoreId,
  updateReservation,
  deleteReservation,
  completeReservation,
};
