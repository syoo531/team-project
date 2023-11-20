const WaitingService = require("../services/waitingService");

// message: "현장대기 예약 완료입니다."
const createWaiting = async (req, res, next) => {
  try {
    const waitingService = new WaitingService();
    const waitingList = await waitingService.createWaiting(req.body);
    return res
      .status(400)
      .json({ message: "현장대기 예약 완료입니다.", data: waitingList });
  } catch (error) {
    next(error);
  }
};

const getWaiting = async (req, res, next) => {
  try {
    const waitingService = new WaitingService();
    const getWaitingList = await waitingService.getWaiting(req.body);
    return res.status(400).json({
      message: "현장대기 예약 조회 목록입니다.",
      data: getWaitingList,
    });
  } catch (error) {
    next(error);
  }
};

// popupStoreId에 대한 대기열 조회
const getWaitingByPopupStore = async (req, res, next) => {
  try {
    const waitingService = new WaitingService();
    const popupStoreId = req.params.popup_store;
    const getWaitingListByPopupStore =
      await waitingService.getWaitingListByPopupStore(popupStoreId);
    return res.status(400).json({
      message: "현장대기 예약 조회 목록입니다.",
      data: getWaitingListByPopupStore,
    });
  } catch (error) {
    next(error);
  }
};

const waitingNumber = async (req, res, next) => {
  try {
    const waitingService = new WaitingService();
    const waitingNumber = await waitingService.waitingNumber(req.body);
    return res
      .status(400)
      .json({ message: "대기 번호입니다.", data: waitingNumber });
  } catch (error) {
    next(error);
  }
};

// waitingTeam이 0팀일때
// "바로 입장 가능합니다" message 출력.
const checkWaitingTeam = async (req, res, next) => {
  const { waiting_queue } = req.body;
  try {
    return res.status(400).json({ message: "바로 입장 가능합니다." });
  } catch (error) {
    next(error);
  }
};

const checkWaitingTime = async (req, res, next) => {
  try {
    return res.status(400).json({ message: "예상 대기시간입니다." });
  } catch (error) {
    next(error);
  }
};

const completeWaiting = async (req, res, next) => {
  try {
    return res.status(400).json({ message: "현장 대기를 최소합니다." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createWaiting,
  getWaiting,
  getWaitingByPopupStore,
  waitingNumber,
  checkWaitingTeam,
  checkWaitingTime,
  completeWaiting,
};
