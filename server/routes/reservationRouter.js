const { Router } = require("express");
const {
  createReservation,
  getAllReservations,
  deleteReservation,
  getReservationById,
  updateReservation,
  completeReservation,
} = require("../controllers/reservationController");

const router = Router();

router.post("/", createReservation);
router.get("/:id", getReservationById);
router.get("/", getAllReservations);
router.patch("/:id", updateReservation);
router.delete("/:id", deleteReservation);
router.patch("/:id/complete", completeReservation);

module.exports = router;
