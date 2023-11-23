const { Router } = require("express");
const {
  getWaitingStatus,
  createWaiting,
} = require("../controllers/waitingController");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.get("/getWaitingStatus", validateToken, getWaitingStatus); // 현장대기 현황 조회
router.post("/createWaiting", createWaiting); // 현장대기 접수

module.exports = router;
