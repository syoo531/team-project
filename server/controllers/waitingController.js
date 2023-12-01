const WaitingService = require("../services/waitingService");
const { PopupStore, Waiting } = require("../models");

const {
  NotFoundError,
  BadRequestError,
  InternalServerError,
  ConflictError,
} = require("../config/customError");

// 현장대기 접수, (팝업스토어 ID, 대기인원, AccessToken 필요 -> 내 앞에 몇명인가)
const createWaiting = async (req, res, next) => {
  try {
    const { popup, people } = req.body;
    const email = req.decoded.user.email;

    const waitingService = new WaitingService();
    const validateWaitingService = await waitingService.validateWaiting(
      email,
      popup
    );
    if (!validateWaitingService) {
      throw new Error("해당 팝업스토어에 이미 현장대기 완료했습니다.");
    }
    const beforeMe = await waitingService.createWaiting(popup, people, email);

    return res
      .status(200)
      .json({ message: "현장대기 예약 완료입니다.", data: beforeMe });
  } catch (error) {
    next(error);
  }
};

// PopupStore에서 popupStore 이름으로 ObjectId 찾기
// Waiting에서 ObjectId로 userId 찾기
const getPopupStoreId = async (req, res, next) => {
  try {
    const { name } = req.query;
    const popupStore = await PopupStore.findOne({ name });

    if (!popupStore) {
      return res
        .status(404)
        .json({ error: "해당 팝업스토어 Id가 존재하지 않습니다." });
    }

    res.json(popupStore);
  } catch (error) {
    res.status(500).json({ error: "팝업스토어 Id 검색 실패" });
  }
};

// 현장대기 현황 조회, (팝업스토어 ID -> 웨이팅 큐)
const getWaitingStatus = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;

    const waitingService = new WaitingService();
    const waitingStatus = await waitingService.getWaitingStatus(email);
    if (!waitingStatus) {
      throw new NotFoundError("조회되는 대기가 없습니다!");
    }

    return res.status(200).json({
      message: "현장대기 예약 조회 목록입니다.",
      data: waitingStatus,
    });
  } catch (error) {
    next(error);
  }
};

// 현장 대기 인원 수정
const updateWaitingPeople = async (req, res, next) => {
  try {
    const { userId, popupStoreId, people } = req.body;
    const waitingService = new WaitingService();
    const updateWaitingPeople = await waitingService.updateWaitingPeople(
      userId,
      popupStoreId,
      people
    );

    return res.status(200).json({
      message: "해당 팝업스토어에 대한 현장 대기 인원 수정 완료했습니다.",
    });
  } catch (err) {
    next(err);
    res.status(400).json({
      error: "해당 팝업스토어에 대한 현장 대기 인원 수정 실패했습니다.",
    });
  }
};

// 현장 대기 취소
const cancelWaiting = async (req, res, next) => {
  try {
    const email = req.decoded.user.email;
    const id = req.params.id;

    const waitingService = new WaitingService();
    const canceledWaiting = await waitingService.cancelWaiting(email, id);

    if (!canceledWaiting) {
      throw new NotFoundError("조회되는 대기가 없습니다!");
    }

    return res.status(200).json({
      message: "현장대기가 취소되었습니다.",
    });
  } catch (err) {
    next(err);
  }
};

// 업체 관리자 페이지에서 waitingList 조회
const getWaitingListByCorpAdmin = async (req, res) => {
  try {
    const popupstoreId = req.corpAdminPopupId;

    const waitingService = new WaitingService();
    const users = await waitingService.getWaitingByPopupStore(popupstoreId);
    res.status(200).json(users);
  } catch (error) {
    res.status(200).json({ error: "팝업스토어에 대한 대기리스트 조회 실패" });
  }
};

const enterWaitingList = async (req, res, next) => {
  try {
    const popupStoreId = req.corpAdminPopupId;
    const { userId } = req.body;

    console.log("Received request with:", {
      corpAdminPopupId: popupStoreId,
      userId: userId,
    });

    const waitingService = new WaitingService();
    const completedWaiting = await waitingService.enterWaitingList(
      popupStoreId,
      userId
    );

    console.log("Completed waiting:", completedWaiting);

    if (!completedWaiting) {
      console.log("No waiting found for:", { popupStoreId, userId });
      return res.status(404).json({ message: "Waiting not found" });
    }

    res.status(200).json({ message: "현장대기자 입장이 완료되었습니다." });
  } catch (error) {
    console.error("Error in enterWaitingList:", error);
    next(error);
  }
};

module.exports = {
  createWaiting,
  getPopupStoreId,
  getWaitingStatus,
  updateWaitingPeople,
  cancelWaiting,
  getWaitingListByCorpAdmin,
  enterWaitingList,
};
