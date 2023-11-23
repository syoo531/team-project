const { Router } = require("express");
const {
  createWaiting,
  getWaiting,
  getWaitingByPopupStore,
  waitingNumber,
  checkWaitingTeam,
  checkWaitingTime,
  completeWaiting,
} = require("../controllers/waitingController");

const router = Router();

router.post("/createWaiting", createWaiting);
router.get("/getWaitingList", getWaiting);
router.get("/getWaitingByPopupStore/:popupStore", getWaitingByPopupStore);
router.get("/waitingNumber", waitingNumber);
router.get("/checkWaitingTeam", checkWaitingTeam);
router.get("/checkWaitingTime", checkWaitingTime);
router.get("/corpAdmin", completeWaiting);

module.exports = router;
