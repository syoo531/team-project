const { Router } = require("express");
const {
  createReservation,
  getAllReservations,
  deleteReservation,
  getReservationById,
} = require("../controllers/reservationController");

const router = Router();

router.post("/", createReservation);
router.get("/:id", getReservationById);
router.get("/", getAllReservations);
// router.patch("/:id", updateReservation);
router.delete("/:id", deleteReservation);

module.exports = router;
