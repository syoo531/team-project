// 팝업스토어 업체 관리자 페이지
"use client";
import React, { useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import Waiting from "./components/waiting/waiting";
import "./main.scss";
import Header from "./components/header/header";
import CompletedWaiting from "./components/completeWaiting/completeWaiting";

// 초기 예약 데이터
const initialReservations = [
  { id: 1, name: "홍길동", count: 2, phone: "010-3333-4444", time: "17:30" },
  { id: 2, name: "홍길동", count: 2, phone: "010-3333-4444", time: "17:30" },
  { id: 3, name: "홍길동", count: 2, phone: "010-3333-4444", time: "17:30" },
];

export default function CorpAdmin() {
  const [reservations, setReservations] = useState(initialReservations); // 초기 예약 상태
  const [completedList, setCompletedList] = useState([]); // 완료된 예약 목록 상태
  const [currentTab, setCurrentTab] = useState("waiting"); // 'waiting' 또는 'completed'

  // 예약 완료 처리 함수
  const handleComplete = (id) => {
    const updatedReservations = reservations.filter((r) => r.id !== id);
    setReservations(updatedReservations);

    const completed = reservations.find((r) => r.id === id);
    if (completed) {
      setCompletedList([
        ...completedList,
        { ...completed, status: "completed" },
      ]);
    }
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
            <Waiting reservations={reservations} onCompleted={handleComplete} />
          )}
          {currentTab === "completed" && (
            <CompletedWaiting completedList={completedList} />
          )}
        </div>
      </div>
    </div>
  );
}
