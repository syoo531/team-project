// 예약내역 박스
"use client";
import "./ReservationBox.scss";
import React, { useState, useEffect } from "react";

export default function ReservationBox() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log("isVisible: ", isVisible);
  }, [isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    console.log("handleClose OK");
  };

  return (
    <div className="reservationBoxContainer">
      <div>더 현대 서울 3층 포켓몬스터 팝업스토어 매장</div>
      <button onClick={handleClose}>X</button>
      <div>애니</div>
      <div>대기 번호 1673번</div>
      <div>총 인원 2명</div>
      <div className="writeReview">리뷰쓰기</div>
    </div>
  );
}
