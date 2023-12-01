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
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    const getWaiting = async () => {
      try {
        const response = await instance.get(`/waiting/getWaitingUser`);
        const waitingReservations = response.data.filter((r) => !r.is_enter);
        const completedReservations = response.data.filter((r) => r.is_enter);
        setReservations(waitingReservations);
        setCompletedList(completedReservations);
      } catch (error) {
        console.error("There was an error!", error);
      }
    };

    getWaiting();
  }, []);

  useEffect(() => {
    sortReservations(sortOrder);
  }, [currentTab]);

  const handleComplete = async (reservation, popupStoreId, userId) => {
    try {
      const response = await instance.put("/waiting/enterWaitingList", {
        corpAdminPopupId: popupStoreId,
        userId: reservation.user._id,
      });
      if (response.status === 200 || response.status === 204) {
        setReservations((prev) =>
          prev.filter((r) => r._id !== reservation._id)
        );
        setCompletedList((prev) => [
          ...prev,
          { ...reservation, is_enter: true },
        ]);
      }
    } catch (error) {
      console.error("Error updating entry:", error);
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
      <div className="reservationSelectBox">
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="default">정렬</option>
          <option value="name">이름</option>
          <option value="people">총인원</option>
        </select>
      </div>
      <div className="reservationList">
        {currentTab === "대기중" && reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div key={reservation._id} className="reservationBox">
              <div className="reservationDetails">
                <div className="reservationContent">
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
          ))
        ) : currentTab === "대기중" ? (
          <div className="emptyListMessage">웨이팅 목록 내용이 없습니다.</div>
        ) : null}
      </div>
      {currentTab === "완료됨" && completedList.length > 0 ? (
        completedList.map((reservation) => (
          <div key={reservation._id} className="reservationBox">
            <div className="reservationDetails">
              <div className="reservationContent">
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
        ))
      ) : currentTab === "완료됨" ? (
        <div className="emptyListMessage">완료된 목록 내용이 없습니다.</div>
      ) : null}
    </div>
  );
}
