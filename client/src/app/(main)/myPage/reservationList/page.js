// 마이페이지
import React from "react";
import "./page.scss";
import MenuBar from "../components/menuBar/MenuBar";
import ReservationBox from "../components/reservationBox/ReservationBox";

export default function ReservationList() {
  return (
    <div className="reservationContainer">
      <MenuBar />
      <div className="myPageReserveTitle">예약내역</div>
      <ReservationBox />
      <ReservationBox />
      <ReservationBox />
      <ReservationBox />
    </div>
  );
}
