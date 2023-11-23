const { Waiting, PopupStore, User } = require("../models");
// const mongoose = require("mongoose");

const completeCounter = 0;
const checkWaitingTeam = 0;

class WaitingService {
  async createWaiting(popup, people, user) {
    const newWaitingData = {
      date: new Date(),
      people,
      popup_store: popup,
      user,
    };
    const newWaiting = await Waiting.create(newWaitingData); // 새로운 웨이팅 정보 만듬
    const popupData = await PopupStore.findOne({ _id: popup });
    const beforeMe = popupData.waiting_queue.length; // 내 앞에 몇명인지 체크
    const pushWaitingQueue = await PopupStore.updateOne(
      // waiting_queue에 push
      { _id: popup },
      {
        $push: {
          waiting_queue: newWaiting._id,
        },
      }
    );

    console.log("여기44", beforeMe);
    return beforeMe;
  }

  // 현장대기 현황 조회
  async getWaitingStatus(email) {
    // 1. email로 유저 objectID 찾고
    // 2. 유저 objectId로 waiting을 찾고
    // 3. waiting의 objectID로 popupstore의 waiting_queue를 가져와서
    // 4. queue에서 내가 몇번째인지 확인
    // 5. 현장대기 걸어둔 팝업스토어가 다수이면 배열로 만들어서 리턴

    const user = await User.findOne({ email });

    const waiting = await Waiting.find({ user });

    let result = [];
    for (let v of waiting) {
      const popup = v.popup_store;
      const popupStore = await PopupStore.findOne({ _id: popup });

      const idx = popupStore.waiting_queue.indexOf(v._id);

      result.push([popupStore.name, idx]); // [대기 걸어둔 팝업스토어 이름, 내 앞에 몇명인지]
    }
    return result;
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
