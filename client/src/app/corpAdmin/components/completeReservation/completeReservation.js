import React from "react";
import "../waiting/waiting.scss";

export default function CompletedReservations({ completedList }) {
  return (
    <div className="reservationContainer">
      <h2>완료</h2>
      <div className="reservationList">
        {completedList.map((reservation) => (
          <div key={reservation._id} className="reservationBox">
            <div className="reservationDetails">
              <div>
                <span>예약: {reservation._id}</span>
                <span>{reservation.user?.name}</span>
                <span>{reservation.people}명</span>
                <span>{reservation.user?.phone_number}</span>
              </div>
              <div className="reservationTime">
                예약시간: {reservation.date} {reservation.hour}
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
