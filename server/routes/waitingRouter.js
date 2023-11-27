const { Router } = require("express");
const {
  getWaitingStatus,
  createWaiting,
  updateWaitingPeople,
  deleteWaitingPeople,
  getWaitingListByCorpAdmin,
  enterWaitingList,
} = require("../controllers/waitingController");
const validateToken = require("../middlewares/validateToken");

const router = Router();

router.get("/getWaitingStatus", validateToken, getWaitingStatus); // 현장대기 현황 조회
router.post("/createWaiting", validateToken, createWaiting); // 현장대기 접수
router.put("/updatePeople", updateWaitingPeople);
router.delete("/deleteWaiting", deleteWaitingPeople);
router.get("/getWaitingUser", validateToken, getWaitingListByCorpAdmin);
router.put("/enterWaitingList", validateToken, enterWaitingList);

module.exports = router;
