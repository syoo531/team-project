import React from "react";
import "../waiting/waiting.scss";

export default function CompletedWaiting({ completedList }) {
  return (
    <div className="reservationContainer">
      <h2>완료</h2>
      <div className="reservationList">
        {completedList.map((reservation) => (
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
                <button>완료</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
