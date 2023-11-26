const { Router } = require("express");
const {
  createReservation,
  getAllReservations,
  deleteReservation,
  getReservationsByPopupStoreId,
  updateReservation,
  completeReservation,
} = require("../controllers/reservationController");
// const validateToken = require("../middlewares/validateToken");

const router = Router();

router.post("/", createReservation);
router.get("/getReservationUser", getReservationsByPopupStoreId);
router.get("/", getAllReservations);
router.patch("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.patch("/complete", completeReservation);

module.exports = router;
