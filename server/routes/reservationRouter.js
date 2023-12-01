const { Router } = require("express");
const {
  createReservation,
  getAllReservations,
  deleteReservation,
  getReservationByCorpAdmin,
  updateReservation,
  enterReservation,
  getMyReservation,
  validateCorp,
} = require("../controllers/reservationController");
const validateToken = require("../middlewares/validateToken");
const validateCorpAdmin = require("../middlewares/validateCorpAdmin");

const router = Router();

router.post("/validation", validateCorpAdmin, validateCorp);
router.post("/", validateToken, createReservation);
router.get(
  "/getReservationByCorpAdmin",
  validateCorpAdmin,
  getReservationByCorpAdmin
);
router.get("/", getAllReservations);
router.get("/getMyReservation", validateToken, getMyReservation); // 내 사전예약 불러오기
router.patch("/:id", updateReservation);
router.delete("/deleteReservation/:id", validateToken, deleteReservation);
router.put("/enterReservation", validateCorpAdmin, enterReservation);

module.exports = router;
