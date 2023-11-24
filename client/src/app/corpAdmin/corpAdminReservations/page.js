"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "../main.scss";

export default function corpAdminReservations() {
  const [currentTab, setCurrentTab] = useState("대기중");
  const [reservations, setReservations] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [sortOrder, setSortOrder] = useState("name");
  const [originalCompletedList, setOriginalCompletedList] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/reservation`)
      .then((response) => {
        console.log("Loaded reservations:", response.data);
        const waitingReservations = response.data.filter(
          (r) => r.status === "대기중"
        );
        const completedReservations = response.data.filter(
          (r) => r.status === "완료됨"
        );

        setReservations(waitingReservations);
        setCompletedList(completedReservations);
        setOriginalCompletedList(completedReservations); // 완료된 예약 목록의 초기 상태 저장
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  useEffect(() => {
    sortReservations(sortOrder);
  }, [currentTab]);

  const handleComplete = (id) => {
    const newReservations = reservations.filter((r) => r._id !== id);
    setReservations(newReservations);

    const completedReservation = reservations.find((r) => r._id === id);
    if (completedReservation) {
      const newCompletedReservation = {
        ...completedReservation,
        status: "완료됨",
      };
      setCompletedList((prev) => [...prev, newCompletedReservation]);
    }
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    sortReservations(e.target.value, reservations);
  };

  const sortReservations = (order) => {
    let listToSort = currentTab === "대기중" ? reservations : completedList;
    let sortedReservations;
    switch (order) {
      case "name":
        sortedReservations = [...listToSort].sort((a, b) =>
          a.user?.name.localeCompare(b.user?.name)
        );
        break;
      case "date":
        sortedReservations = [...listToSort].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        break;
      case "people":
        sortedReservations = [...listToSort].sort(
          (a, b) => a.people - b.people
        );
        break;
    }

    if (currentTab === "대기중") {
      setReservations(sortedReservations);
    } else {
      setCompletedList(sortedReservations);
    }
  };

  return (
    <div className="reservationContainer">
      <div className="reservationHeader">
        <h1>사전예약 현황</h1>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="name">이름</option>
          <option value="date">날짜</option>
          <option value="people">총인원</option>
        </select>
        <div className="tabs">
          <button
            className={`tab ${currentTab === "대기중" ? "active" : ""}`}
            onClick={() => setCurrentTab("대기중")}
          >
            사전예약
          </button>
          <button
            className={`tab ${currentTab === "완료됨" ? "active" : ""}`}
            onClick={() => setCurrentTab("완료됨")}
          >
            완료
          </button>
        </div>
      </div>
      <div className="reservationList">
        {currentTab === "대기중" &&
          reservations.map((reservation) => (
            <div key={reservation._id} className="reservationBox">
              <div className="reservationDetails">
                <div>
                  <span>예약</span>
                  <span>{reservation.user?.name}</span>
                  <span>{reservation.people}명</span>
                  <span>{reservation.user?.phone_number}</span>
                </div>
                <div className="reservationTime">
                  예약시간: {reservation.date.split("T")[0]} {reservation.hour}
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
                예약시간: {reservation.date.split("T")[0]} {reservation.hour}
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
  );
}
