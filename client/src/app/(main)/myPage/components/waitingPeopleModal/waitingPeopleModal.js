import "./waitingPeopleModal.scss";
import { useState } from "react";

export default function UpdateWaitingPeople({ isOpen, onClose }) {
  // 1. useState 작성
  const [people, setPeople] = useState(0);

  const increasePeople = () => {
    setPeople((prevPeople) => prevPeople + 1);
  };

  const decreasePeople = () => {
    setPeople((prevPeople) => Math.max(prevPeople - 1, 0));
  };

  return (
    <div
      className="updateWaitingContainer"
      style={{ display: isOpen ? "block" : "none" }}
    >
      <button className="closeButton" onClick={onClose}>
        X
      </button>
      <div className="waitingText">현장 대기 인원을 수정합니다.</div>
      <div className="updatePeopleContainer">
        <button onClick={decreasePeople}>-</button>
        <div>{people}</div>
        <button onClick={increasePeople}>+</button>
      </div>
      <button>완료</button>
    </div>
  );
}
