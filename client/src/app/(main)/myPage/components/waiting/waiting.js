import "./waiting.scss";
import PeopleModal from "../waitingPeopleModal/waitingPeopleModal";
import CancelModal from "../cancleWaitingModal/cancleWaitingModal";
// import instance from "../../../../../utils/instance";
import instance from "@/utils/instance";

import React, { useState, useEffect } from "react";

export default function Waiting() {
  // 1. useState 작성
  const [waitingData, setWaitingData] = useState({ message: "", data: [] });
  const [peopleModal, setPeopleModal] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);

  // 현장 대기 인원 수정하기 위한 모달
  const openPeopleModal = () => {
    setPeopleModal(true);
  };

  const closePeopleModal = () => {
    setPeopleModal(false);
  };

  const openCancelModal = () => {
    setCancelModal(true);
  };

  const closeCancelModal = () => {
    setCancelModal(false);
  };

  // 2. useEffect 작성 (계속 업데이트 되야 하는 부분)
  useEffect(() => {
    const axiosWaitingStatus = async () => {
      try {
        const response = await instance(`/waiting/getWaitingStatus`);

        const waitingData = response.data;

        // 현장 대기 상태 업데이트
        setWaitingData(waitingData);

        // 데이터 조회가 정상 동작하는지 test
        console.log(waitingData.message);
        console.log(waitingData.data); // [["VANS & BOLT 팝업스토어 : VANS MEETS BOLT", 0]];
        console.log("data[0]: ", waitingData.data[0][0]);
        console.log("data[1]: ", waitingData.data[0][1]);
        console.log("waitingData.data.length: ", waitingData.data.length);
      } catch (error) {
        console.error(
          "현장 대기한 팝업스토어와 대기팀 데이터 조회를 실패하였습니다.",
          error
        );
        setWaitingData({ message: "", data: [] });
      }
    };

    // 3. 대기

    // 현장 대기 조회를 하기 위한 함수 호출
    axiosWaitingStatus();
  }, []);

  return (
    <div className="waitingContainer">
      {waitingData.data.map((item, outerIndex) => (
        <div key={outerIndex}>
          {item.map((innerItem, innerIndex) => (
            <div key={innerIndex} className="popUpStoreName">
              {innerItem}
            </div>
          ))}
          <div className="waitingTimeContainer">
            <div className="waitingInfoWrapper">
              <div className="waitingTeamText">대기중</div>
              <div className="waitingTimeText">{item[1]}팀</div>
            </div>
          </div>
          <div className="waitingInfoButton">
            <button className="waitingButtonText" onClick={openPeopleModal}>
              웨이팅 정보 수정
            </button>
          </div>
          <PeopleModal isOpen={peopleModal} onClose={closePeopleModal} />
          <div className="waitingInfoButton">
            <button className="waitingButtonText" onClick={openCancelModal}>
              웨이팅 취소
            </button>
          </div>
          <CancelModal isOpen={cancelModal} onClose={closeCancelModal} />
        </div>
      ))}
    </div>
  );
}
