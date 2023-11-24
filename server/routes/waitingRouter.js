const { Router } = require("express");
const {
  getWaitingStatus,
  createWaiting,
  getWaitingListByCorpAdmin,
} = require("../controllers/waitingController");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.get("/getWaitingStatus", validateToken, getWaitingStatus); // 현장대기 현황 조회
router.post("/createWaiting", validateToken, createWaiting); // 현장대기 접수
router.get("/getWaitingUser", getWaitingListByCorpAdmin);

module.exports = router;
