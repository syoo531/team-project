const { Router } = require("express");
const {
  createWaiting,
  waitingNumber,
  checkWaitingTeam,
  checkWaitingTime,
  completeWaiting,
} = require("../controllers/waitingController");

const router = Router();

router.post("/myPageHome", createWaiting);
router.get("/myPageHome/waitingNumber", waitingNumber);
router.get("/myPageHome/checkWaitingTeam", checkWaitingTeam);
router.get("/myPageHome/checkWaitingTime", checkWaitingTime);
router.get("/corpAdmin", completeWaiting);

module.exports = router;
