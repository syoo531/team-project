"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faUsers,
  faPhone,
  faBullhorn,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "../main.scss";
import instance from "@/utils/instance";

export default function corpAdminWaitingList() {
  const [currentTab, setCurrentTab] = useState("대기중");
  const [reservations, setReservations] = useState([]);
  const [completedList, setCompletedList] = useState([]);

  useEffect(() => {
    instance
      .get(`/waiting/getWaitingUser`, {
        params: {
          popupStoreId: "656246c6f8ee991dd36cf6bf",
        },
      })
      .then((response) => {
        console.log("Loaded reservations:", response.data);
        const waitingReservations = response.data.filter((r) => !r.is_enter);
        const completedReservations = response.data.filter((r) => r.is_enter);
        setReservations(waitingReservations);
        setCompletedList(completedReservations);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);

  const handleComplete = (reservation) => {
    instance
      .put("/waiting/enterWaitingList", {
        popupStoreId: reservation.popup_store,
        userId: reservation.user._id,
      })
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          setReservations((prev) =>
            prev.filter((r) => r._id !== reservation._id)
          );
          setCompletedList((prev) => [
            ...prev,
            { ...reservation, is_enter: true },
          ]);
        }
      })

      .catch((error) => {
        console.error("Error updating entry:", error);
      });
  };

  return (
    <div className="reservationContainer">
      <div className="reservationHeader">
        <h1>웨이팅 현황</h1>
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
      </div>
      <div className="reservationList">
        {currentTab === "대기중" &&
          reservations.map((reservation) => (
            <div key={reservation._id} className="reservationBox">
              <div className="reservationDetails">
                <div>
                  <span className="reservationType">웨이팅</span>
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
                <div className="buttonContainer">
                  <button onClick={() => handleComplete(reservation)}>
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
                <span className="reservationType">웨이팅</span>
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
