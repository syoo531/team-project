import React from "react";
import "./waiting.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faStopwatch } from "@fortawesome/free-solid-svg-icons";

// 임시 예약 데이터
const reservations = [
  {
    id: 1,
    name: "홍길동",
    count: 2,
    phone: "010-3333-4444",
    time: "17:30",
  },
  {
    id: 2,
    name: "김철수",
    count: 3,
    phone: "010-1111-2222",
    time: "14:00",
  },
];

export default function Waiting() {
  return (
    <div className="reservationContainer">
      <div className="reservationList">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservationBox">
            <div className="reservationDetails">
              <div>
                <span>웨이팅 번호: {reservation.id}</span>
                <span>{reservation.name}</span>
                <span>{reservation.count}명</span>
                <span>{reservation.phone}</span>
              </div>
              <div className="reservationTime">
                예약시간: {reservation.time}
              </div>
              <div className="buttonContainer">
                <button>
                  <FontAwesomeIcon icon={faStopwatch} className="icon" />
                  대기
                </button>
                <button>
                  <FontAwesomeIcon icon={faCheck} className="icon" />
                  입장
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
