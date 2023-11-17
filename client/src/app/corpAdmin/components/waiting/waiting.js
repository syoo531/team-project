import React from "react";
import "./waiting.scss";
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
    <div className="reservation-container">
      <div className="reservation-list">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservation-box">
            <div className="reservation-details">
              <span>대기번호:{reservation.id}</span>
              <span>이름: {reservation.name}</span>
              <span>인원수: {reservation.count}</span>
              <span>전화번호: {reservation.phone}</span>
              <div>예약 시간: {reservation.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
