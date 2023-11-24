"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
// import Header from "../components/header/header";
// import Sidebar from "../components/sidebar/sidebar";
import "../main.scss";

export default function corpAdminWaitingList() {
  const [currentTab, setCurrentTab] = useState("대기중");
  const [reservations, setReservations] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/waiting`)
      .then((response) => {
        console.log("Loaded reservations:", response.data);
        // 가정: 서버에서 'status' 속성을 통해 예약 상태를 받아온다.
        const waitingReservations = response.data.filter(
          (r) => r.status === "대기중"
        );
        const completedReservations = response.data.filter(
          (r) => r.status === "완료됨"
        );

        setReservations(waitingReservations);
        setCompletedList(completedReservations);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleComplete = (id) => {
    setReservations((prev) => prev.filter((r) => r._id !== id));
    const completedReservation = reservations.find((r) => r._id === id);
    if (completedReservation) {
      setCompletedList((prev) => [
        ...prev,
        { ...completedReservation, status: "완료됨" },
      ]);
    }
  };

  return (
    <div>
      <div className="tabs">
        <button
          className={`tab ${currentTab === "대기중" ? "active" : ""}`}
          onClick={() => setCurrentTab("대기중")}
        >
          웨이팅중
        </button>
        <button
          className={`tab ${currentTab === "완료됨" ? "active" : ""}`}
          onClick={() => setCurrentTab("완료됨")}
        >
          완료
        </button>
      </div>
      <h2>웨이팅 현황</h2>
      <div className="reservationContainer">
        <div className="reservationList">
          {currentTab === "대기중" &&
            reservations.map((reservation) => (
              <div key={reservation._id} className="reservationBox">
                <div className="reservationDetails">
                  <div>
                    <span>대기번호:{reservation._id}</span>
                    <span>{reservation.user?.name}</span>
                    <span>{reservation.people}명</span>
                    <span>{reservation.user?.phone_number}</span>
                  </div>
                  <div className="reservationTime">
                    예약시간: {reservation.date} {reservation.hour}
                  </div>
                  <div className="buttonContainer">
                    <button onClick={() => handleComplete(reservation._id)}>
                      <FontAwesomeIcon icon={faCheck} />
                      입장
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {currentTab === "완료됨" &&
          completedList.map((reservation) => (
            <div key={reservation._id} className="reservationBox">
              <div className="reservationDetails">
                <div>
                  <span>예약</span>
                  <span>{reservation.user?.name}</span>
                  <span>{reservation.people}명</span>
                  <span>{reservation.user?.phone_number}</span>
                </div>
                <div className="reservationTime">
                  예약시간: {reservation.date} {reservation.hour}
                </div>
                <div className="buttonContainer">
                  <div className="completed">
                    <FontAwesomeIcon icon={faCheck} />
                    완료됨
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
