const { Router } = require("express");
const {
  getWaitingStatus,
  createWaiting,
} = require("../controllers/waitingController");

const router = Router();

router.get("/getWaitingStatus", getWaitingStatus); // 현장대기 현황 조회
router.post("/createWaiting", createWaiting); // 현장대기 접수

module.exports = router;
