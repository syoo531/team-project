"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faUsers,
  faPhone,
  faBullhorn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../main.scss";

export default function corpAdminReservations() {
  const [currentTab, setCurrentTab] = useState("대기중");
  const [reservations, setReservations] = useState([]);
  const [completedList, setCompletedList] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/reservation/getReservationUser`, {
        // headers: {
        //   Authorization:
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiWUVFVU4gTEVFIiwiZW1haWwiOiJhbXkwMDA4MDlAZ21haWwuY29tIn0sImlhdCI6MTcwMDkwNjU5OSwiZXhwIjoxNzAwOTkyOTk5fQ.jY7Crie-uuk-T19FVSe9x8zN2Nr0OaYmVXQJcydwObE",
        // },
        params: {
          popupStoreId: "655f56aaaca697ca092e1aec",
        },
      })

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
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  useEffect(() => {
    sortReservations(sortOrder);
  }, [currentTab]);

  const handleComplete = (id) => {
    axios
      .patch(`http://localhost:4000/api/reservation/${id}/complete`)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
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
        }
      })
      .catch((error) => {
        console.error("Error completing reservation:", error);
      });
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
      case "default":
        sortedReservations = [...listToSort];
        break;
      default:
        sortedReservations = [...listToSort];
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
      <div className="reservationSelectBox">
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="default">정렬</option>
          <option value="name">이름</option>
          <option value="date">날짜</option>
          <option value="people">총인원</option>
        </select>
      </div>
      <div className="reservationList">
        {currentTab === "대기중" &&
          reservations.map((reservation) => (
            <div key={reservation._id} className="reservationBox">
              <div className="reservationDetails">
                <div>
                  <span className="reservatioType">웨이팅</span>
                  <span>
                    <FontAwesomeIcon icon={faUser} className="icon" />
                    {reservation.user?.name}
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faUsers} className="icon" />
                    {reservation.people}명
                  </span>
                  <span>
                    <FontAwesomeIcon icon={faPhone} className="icon" />
                    {reservation.user?.phone_number}
                  </span>
                </div>
                <div className="reservationTime">
                  예약시간: {reservation.date.split("T")[0]} {reservation.hour}
                </div>
                <div className="buttonContainer">
                  <button onClick={() => handleComplete(reservation._id)}>
                    <FontAwesomeIcon icon={faBullhorn} />
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
                <span className="reservatioType">웨이팅</span>
                <span>
                  <FontAwesomeIcon icon={faUser} className="icon" />
                  {reservation.user?.name}
                </span>
                <span>
                  <FontAwesomeIcon icon={faUsers} className="icon" />
                  {reservation.people}명
                </span>
                <span>
                  <FontAwesomeIcon icon={faPhone} className="icon" />
                  {reservation.user?.phone_number}
                </span>
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
