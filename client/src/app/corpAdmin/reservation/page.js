// 팝업스토어 업체 관리자: 사전등록관리페이지
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReservationContent from "../components/reservationContent/reservationContent";
import Sidebar from "../components/sidebar/sidebar";
import Header from "../components/header/header";
import CompletedReservations from "../components/completeReservation/completeReservation";

export default function Reservation() {
  const [reservations, setReservations] = useState([]); // 초기 예약 상태
  const [completedList, setCompletedList] = useState([]); // 완료된 예약 목록 상태
  const [currentTab, setCurrentTab] = useState("waiting"); // 'waiting' 또는 'completed'

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/reservation`)
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  // 예약 완료 처리 함수
  const handleComplete = (id) => {
    console.log("Before update:", reservations);
    const updatedReservations = reservations.filter((r) => r._id !== id);
    setReservations(updatedReservations);

    const completed = reservations.find((r) => r._id === id);
    if (completed) {
      setCompletedList([
        ...completedList,
        { ...completed, status: "completed" },
      ]);
    }
    console.log("After update:", updatedReservations);
  };

  return (
    <div className="container">
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">
          <div className="tabs">
            <button
              className={`tab ${currentTab === "waiting" ? "active" : ""}`}
              onClick={() => setCurrentTab("waiting")}
            >
              웨이팅중
            </button>
            <button
              className={`tab ${currentTab === "completed" ? "active" : ""}`}
              onClick={() => setCurrentTab("completed")}
            >
              완료
            </button>
          </div>
          {currentTab === "waiting" && (
            <ReservationContent
              reservations={reservations}
              onCompleted={handleComplete}
            />
          )}
          {currentTab === "completed" && (
            <CompletedReservations completedList={completedList} />
          )}
        </div>
      </div>
    </div>
  );
}
