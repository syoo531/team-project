const { Waiting } = require("../models");
// const mongoose = require("mongoose");

const completeCounter = 0;
const checkWaitingTeam = 0;

class WaitingService {
  async createWaiting(date, people, popup_store, user, complete_waiting) {
    // const parsedWaitingQueue = waiting_queue ? JSON.parse(waiting_queue) : [];

    const newWaitingListData = {
      date: new Date(), // 전달된 날짜 문자열을 날짜 객체로 변환
      // waiting_queue: parsedWaitingQueue, // 문자열로 전달된 배열을 파싱
      people,
      popup_store: "6559272a6e93f614f57c589a",
      user: "6555b59c94f41fc12277b519",
      complete_waiting,
    };

    const waitingList = await Waiting.create(newWaitingListData);

    console.log("Create Waiting Data");
    return waitingList;
  }

  // 전체 대기 목록 조회
  async getWaiting() {
    const getWaitingList = await Waiting.find();
    console.log("Get Waiting Data By Id");
    return getWaitingList;
  }

  // 업체 관리자 페이지에서
  // 특정 팝업 스토어 Id에 대한 웨이팅 리스트를 조회할 수 있다.
  async getWaitingByPopupStore() {
    const waitingByPopupStore = await Waiting.find({
      popup_store: "6559272a6e93f614f57c589a",
    })
      .populate("popup_store")
      .populate("user");

    return waitingByPopupStore;
  }

  // 현장 대기 번호 조회
  // [...] length
  async waitingNumber() {
    // const waitingNumber = .length;
    console.log("WaitingNumber Data OK");
    return waitingNumber;
  }

  // 현장 대기 팀 수 조회
  async checkWaitingTeam() {
    checkWaitingTeam = waitingTeam - completeCounter + 1;
    res.json(checkWaitingTeam);
    return "WaitingTeam Data OK";
  }

  // 대기 시간 확인
  // 1팀 당 대기시간 2분이라고 가정하고 출력
  // 단위 : checkWaitingTime 분
  async checkWaitingTime() {
    const checkWaitingTime = checkWaitingTeam * 2;
    res.json(checkWaitingTime);
    return "WaitingTime Data OK";
  }

  async completeWaiting(complete_waiting) {
    const completeWaiting = Waiting.updateOne({ complete_waiting: true });
    console.log("Complete Waiting success");
    completeCounter++;
    return completeWaiting;
  }
}

module.exports = WaitingService;
