import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faPhone } from "@fortawesome/free-solid-svg-icons";
import "./../waiting/waiting.scss";
import "../../main.scss";

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

export default function ReservationContent() {
  return (
    <div className="reservationContainer">
      <div className="reservationList">
        {reservations.map((reservation) => (
          <div key={reservation.id} className="reservationBox">
            <div className="reservationDetails">
              <div>
                <span>예약:{reservation.id}</span>
                <span>이름: {reservation.name}</span>
                <span>인원수: {reservation.count}</span>
                <span>
                  <FontAwesomeIcon icon={faPhone} />
                  {reservation.phone}
                </span>
              </div>
              <div>예약 시간: {reservation.time}</div>{" "}
              <div>
                <FontAwesomeIcon icon={faCheck} />
                입장
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
