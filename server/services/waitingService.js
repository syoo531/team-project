const { Waiting, PopupStore, User } = require("../models");
// const mongoose = require("mongoose");

class WaitingService {
  async createWaiting(popup, people, email) {
    const popup_waiting = await Waiting.find({
      popup_store: popup,
      is_enter: false,
    }).sort({ createdAt: 1 });

    const beforeMe = popup_waiting.length;
    const user = await User.findOne({ email }).select("_id");

    const newWaitingData = {
      date: new Date(),
      people,
      popup_store: popup,
      user: user._id,
    };
    const newWaiting = await Waiting.create(newWaitingData); // 새로운 웨이팅 정보 만듬

    if (!newWaitingData) {
      throw new Error("웨이팅 접수 실패");
    }

    return beforeMe;
  }

  // 현장대기 현황 조회
  async getWaitingStatus(email) {
    const user = await User.findOne({ email }).select("_id name");
    const name = user.name;
    const waiting = await Waiting.find({ user, is_enter: false }).populate({
      path: "popup_store",
      select: ["name", "mainImage"],
      populate: {
        path: "mainImage",
        select: ["url"],
      },
    });

    let result = [];
    if (waiting.length !== 0) {
      for (let v of waiting) {
        const popup = v.popup_store;
        const popup_name = popup.name;
        const popup_image = popup.mainImage.url;
        const popup_id = popup._id;

        const popup_waiting = await Waiting.find({
          popup_store: popup._id,
          is_enter: false,
        }).sort({ createdAt: 1 });

        let idx;
        for (let i = 0; i < popup_waiting.length; i++) {
          if (popup_waiting[i].user.toString() === user._id.toString()) {
            idx = i;
          }
        }

        result.push([popup_name, idx, popup_image, name, popup_id]); // [대기 걸어둔 팝업스토어 이름, 내 앞에 몇명인지]
      }
      return result;
    }
  }

  // 현장 대기 인원수를 수정
  async updateWaitingPeople(userId, popupStoreId, people) {
    const waitingPeople = await Waiting.findOne({
      user: userId,
      popup_store: popupStoreId,
    }).updateOne({ people: people });
  }

  // 현장 대기를 취소
  async cancelWaiting(email, id) {
    const user = await User.findOne({ email }).select("_id");

    const canceledWaiting = await Waiting.deleteOne({
      popup_store: id,
      user: user,
    });
    return canceledWaiting;
  }

  // 업체 관리자 페이지에서
  // 특정 팝업 스토어 Id에 대한 웨이팅 리스트를 조회
  async getWaitingByPopupStore(popup) {
    const waitingByPopupStore = await Waiting.find({
      popup_store: popup,
    })
      .sort({ createdAt: 1 })
      .populate("user")
      .populate("popup_store");

    if (!waitingByPopupStore) {
      throw new Error("팝업스토어 현장대기 조회를 실패했습니다.");
    }

    return waitingByPopupStore;
  }

  // 같은 팝업스토어에 현장대기 하려고 하는지 확인
  async validateWaiting(email, popup) {
    try {
      const user = await User.findOne({ email }).select("_id");
      const isFindUser = await Waiting.findOne({ user, popup_store: popup });
      console.log("isFindUser: ", isFindUser);

      if (!isFindUser) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }

  // 팝업스토어 admin인지 검사
  async validateAdmin(email, popupStoreId) {
    const isAdminUser = await User.findOne({ email }).select("admin_corp");
    console.log("isAdminUser: ", isAdminUser);
    console.log("popupStoreId: ", popupStoreId);

    if (
      isAdminUser &&
      isAdminUser.admin_corp === popupStoreId &&
      isAdminUser.admin_corp !== undefined
    ) {
      return true;
    } else {
      return false;
    }
  }

  // 팝업스토어에 입장했는지 검사
  async enterWaitingList(popupStoreId, userId) {
    const waitingList = await Waiting.findOneAndUpdate(
      {
        popup_store: popupStoreId,
        user: userId,
        is_enter: false,
      },
      { is_enter: true },
      { new: true }
    );
    return waitingList;
  }
}

module.exports = WaitingService;
