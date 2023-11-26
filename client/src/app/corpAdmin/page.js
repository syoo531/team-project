"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import "./main.scss";

export default function CorpAdmin() {
  const [reservations, setReservations] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [currentList, setCurrentList] = useState("waiting");
  useEffect(() => {
    // 사전 예약 목록 불러오기
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
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });

    // 웨이팅 목록 불러오기
    axios
      .get(`http://localhost:4000/api/waiting/getWaitingUser`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiWUVFVU4gTEVFIiwiZW1haWwiOiJhbXkwMDA4MDlAZ21haWwuY29tIn0sImlhdCI6MTcwMDkwNjU5OSwiZXhwIjoxNzAwOTkyOTk5fQ.jY7Crie-uuk-T19FVSe9x8zN2Nr0OaYmVXQJcydwObE",
        },
        params: {
          popupStoreId: "655f56aaaca697ca092e1aec",
        },
      })
      .then((response) => {
        setWaitingList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching waiting list:", error);
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
      </div>
    </div>
  );
}
