const WaitingService = require("../services/waitingService");

// 현장대기 접수, (팝업스토어 ID, 대기인원, AccessToken 필요 -> 내 앞에 몇명인가)
const createWaiting = async (req, res, next) => {
  try {
    const { popup, people } = req.body;
    const email = req.decoded.user.email;

    const waitingService = new WaitingService();
    const beforeMe = await waitingService.createWaiting(popup, people, email); // 새 waiting 만들고

    //waiting_queue에 push하고

    return res
      .status(400)
      .json({ message: "현장대기 예약 완료입니다.", data: beforeMe });
  } catch (error) {
    next(error);
  }
};

// 현장대기 현황 조회, (팝업스토어 ID -> 웨이팅 큐)
const getWaitingStatus = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;

    const waitingService = new WaitingService();
    const waiting_queue = await waitingService.getWaitingStatus(email);

    return res.status(200).json({
      message: "현장대기 예약 조회 목록입니다.",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// 업체 관리자 페이지에서 waitingList 조회
const getWaitingListByCorpAdmin = async (req, res, next) => {
  try {
    const { popupStoreId } = req.query;
    const email = req.decoded.user.email;

    const waitingService = new WaitingService();
    const validate = await waitingService.validateAdmin(email, popupStoreId);
    console.log("validate: ", validate);
    if (!validate) {
      throw new Error("해당 팝업스토어 현장 대기 조회 권한이 없습니다.");
    }
    const users = await waitingService.getWaitingByPopupStore(popupStoreId);
    res.status(200).json(users);
  } catch (error) {
    res.status(200).json({ error: "팝업스토어에 대한 대기리스트 조회 실패" });
  }
};

const enterWaitingList = async (req, res, next) => {
  try {
    const { popupStoreId, userId } = req.body;
    const email = req.decoded.user.email;

    const waitingService = new WaitingService();
    const validate = await waitingService.validateAdmin(email, popupStoreId);
    console.log("validate: ", validate);
    if (!validate) {
      throw new Error("해당 팝업스토어 현장 대기 조회 권한이 없습니다.");
    }
    const enterCheck = await waitingService.enterCheck(popupStoreId, userId);
    console.log("enterCheck: ", enterCheck);
    res.status(200).json({ message: "입장 완료되었습니다." });
  } catch (error) {
    res.status(400).json({ error: "입장 처리 실패하였습니다." });
  }
};

module.exports = {
  createWaiting,
  getWaitingStatus,
  getWaitingListByCorpAdmin,
  enterWaitingList,
};
