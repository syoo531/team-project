"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./main.scss";

export default function CorpAdmin() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/reservation`)
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  }, []);

  return (
    <div className="mainLayout">
      <div className="listTitle">
        <h1>웨이팅 목록</h1>
        <h1>사전예약 목록</h1>
      </div>
      <div className="listContainer">
        <table className="listTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>이름</th>
              <th>총 인원</th>
              <th>전화번호</th>
              <th>예약날짜</th>
              <th>예약시간</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={reservation._id}>
                <td>{index + 1}</td>
                <td>{reservation.user?.name}</td>
                <td>{reservation.people}</td>
                <td>{reservation.user?.phone_number}</td>
                <td>{reservation.date.split("T")[0]}</td>
                <td>{reservation.hour}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
