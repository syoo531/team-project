"use client";
import { useEffect, useState } from "react";
import "./reservation.scss";
import instance from "@/utils/instance";
import reservationCard from "./components/reservationCard";

export default function Reservation() {
  const [myReservation, setMyReservation] = useState(undefined);
  useEffect(() => {
    async function getMyReservation() {
      try {
        const res = await instance.get("/reservation/getMyReservation");
        const reservationList = res.data.data ? res.data.data : undefined;
        setMyReservation(reservationList);
      } catch (error) {
        console.error(error);
      }
    }
    getMyReservation();
  }, []);

  return (
    <div className="myReservationContainer">
      <div className="titleText">내 사전예약</div>
      <div>
        <div className="reservationCardWrapper">
          {myReservation ? myReservation.map((v) => reservationCard(v)) : ""}
        </div>
      </div>
    </div>
  );
}
