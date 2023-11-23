const WaitingService = require("../services/waitingService");

// 현장대기 접수, (팝업스토어 ID, 대기인원 -> 내 앞에 몇명인가)
const createWaiting = async (req, res, next) => {
  try {
    const { popup, people, user } = req.body;

    const waitingService = new WaitingService();
    const newWaiting = await waitingService.createWaiting(popup, people, user); // 새 waiting 만들고

    //waiting_queue에 push하고

    return res
      .status(400)
      .json({ message: "현장대기 예약 완료입니다.", data: newWaiting });
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

// popupStoreId에 대한 대기열 조회
const getWaitingByPopupStore = async (req, res, next) => {
  try {
    const { popupStoreId } = req.params;
    const waitingService = new WaitingService();
    const users = await waitingService.getWaitingByPopupStore(popupStoreId);
    res.status(200).json(users);
  } catch (error) {
    res.status(200).json({ error: "팝업스토어에 대한 대기리스트 조회 실패" });
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
  getWaitingStatus,
  getWaitingByPopupStore,
  waitingNumber,
  checkWaitingTeam,
  checkWaitingTime,
  completeWaiting,
};
