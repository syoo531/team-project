"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import "./main.scss";
import instance from "@/utils/instance";

export default function CorpAdmin() {
  const [reservations, setReservations] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [currentList, setCurrentList] = useState("waiting");

  // 사전 예약 목록 불러오기
  useEffect(() => {
    instance
      .get("/reservation/getReservationByCorpAdmin")
      .then((response) => {
        console.log("사전 예약 목록 API 응답:", response.data.data);
        if (Array.isArray(response.data.data)) {
          setReservations(response.data.data);
        } else {
          setReservations([]);
        }
      })
      .catch((error) => {
        console.error("사전 예약 목록 가져오기 오류:", error);
        setReservations([]);
      });
  }, []);

  // 웨이팅 목록 불러오기
  useEffect(() => {
    instance
      .get("/waiting/getWaitingUser")
      .then((response) => {
        console.log("웨이팅 목록 API 응답:", response.data);
        if (Array.isArray(response.data)) {
          setWaitingList(response.data);
        } else {
          setWaitingList([]);
        }
      })
      .catch((error) => {
        console.error("웨이팅 목록 가져오기 오류:", error);
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
        {reservations.length > 0 && (
          <div className="popupStoreName">
            <FontAwesomeIcon icon={faStore} className="faStoreIcon" />
            팝업스토어 : {reservations[0].popup_store?.name} -
            {reservations[0].popup_store?.brand}
          </div>
        )}
        <select onChange={handleChangeList}>
          <option value="waiting">웨이팅 목록</option>
          <option value="reservation">사전예약 목록</option>
        </select>
      </div>
      <div className="listContainer">
        {listToShow.length > 0 ? (
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
              {listToShow.map((item, index) => (
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
        ) : (
          <div className="emptyListMessage">
            목록이 비었습니다. 새로운 항목을 기다리고 있습니다!
          </div>
        )}
      </div>
    </div>
  );
}
