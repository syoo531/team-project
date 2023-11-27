"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./main.scss";
import instance from "@/utils/instance";

export default function CorpAdmin() {
  const [reservations, setReservations] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [currentList, setCurrentList] = useState("waiting");
  useEffect(() => {
    // 사전 예약 목록 불러오기
    instance
      .get("/reservation/getReservationByCorpAdmin")
      .then((response) => {
        console.log("Reservations API Response:", response.data.data); // 사전 예약 목록 API 응답 확인
        if (Array.isArray(response.data.data)) {
          setReservations(response.data.data);
        } else {
          setReservations([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
        setReservations([]);
      });

    // 웨이팅 목록 불러오기
    instance
      .get(`/waiting/getWaitingUser`, {
        params: {
          popupStoreId: "656246c6f8ee991dd36cf6bf",
        },
      })
      .then((response) => {
        console.log("Waiting List API Response:", response.data);
        if (Array.isArray(response.data)) {
          setWaitingList(response.data);
        } else {
          setWaitingList([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching waiting list:", error);
        setWaitingList([]);
      });
  }, []);

  const handleChangeList = (event) => {
    setCurrentList(event.target.value);
  };

  const listToShow = currentList === "waiting" ? waitingList : reservations;

  return (
    <div className="mainLayout">
      <div className="listTitle">
        <select onChange={handleChangeList}>
          <option value="waiting">웨이팅 목록</option>
          <option value="reservation">사전예약 목록</option>
        </select>
        <FontAwesomeIcon icon={faAngleDown} />
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
            {Array.isArray(listToShow) &&
              listToShow.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.user?.name}</td>
                  <td>{item.people}</td>
                  <td>{item.user?.phone_number}</td>
                  <td>{item.date.split("T")[0]}</td>
                  <td>{item.hour}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
