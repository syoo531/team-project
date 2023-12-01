const { Router } = require("express");
const {
  getWaitingStatus,
  createWaiting,
  getPopupStoreId,
  updateWaitingPeople,
  cancelWaiting,
  getWaitingListByCorpAdmin,
  enterWaitingList,
} = require("../controllers/waitingController");
const validateToken = require("../middlewares/validateToken");
const validateCorpAdmin = require("../middlewares/validateCorpAdmin");

const router = Router();

router.get("/getWaitingStatus", validateToken, getWaitingStatus); // 현장대기 현황 조회
router.post("/createWaiting", validateToken, createWaiting); // 현장대기 접수
router.get("/popupStores", getPopupStoreId);
router.put("/updatePeople", updateWaitingPeople);
router.delete("/cancelWaiting/:id", validateToken, cancelWaiting);
router.get("/getWaitingUser", validateCorpAdmin, getWaitingListByCorpAdmin);
router.put("/enterWaitingList", validateCorpAdmin, enterWaitingList);

module.exports = router;
