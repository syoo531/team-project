"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import "./main.scss";
import instance from "@/utils/instance";

export default function CorpAdmin() {
  const [reservations, setReservations] = useState([]);
  const [waitingList, setWaitingList] = useState([]);
  const [currentList, setCurrentList] = useState("waiting");
  const router = useRouter();
  useEffect(() => {
    const validateAdmin = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const res = await instance.post(`/reservation/validation`);

        if (!accessToken || res.status !== 200) {
          window.alert("권리자 권한이 없습니다");
          router.push("/");
          return;
        }

        if (accessToken || res.status === 200) {
          router.push("/corpAdmin");
          return;
        }
      } catch (error) {
        window.alert("권리자 권한이 없습니다");
        router.push("/");
      }
    };
    validateAdmin();
  }, []);

  // 사전 예약 목록 불러오기
  useEffect(() => {
    instance
      .get("/reservation/getReservationByCorpAdmin")
      .then((response) => {
        if (Array.isArray(response.data.data)) {
          setReservations(response.data.data);
        } else {
          setReservations([]);
        }
      })
      .catch((error) => {
        setReservations([]);
      });
  }, []);

  // 웨이팅 목록 불러오기
  useEffect(() => {
    instance
      .get("/waiting/getWaitingUser")
      .then((response) => {
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
            <div>
              <FontAwesomeIcon icon={faStore} className="faStoreIcon" />
              팝업스토어 :{" "}
            </div>
            <div>{reservations[0].popup_store?.name}</div>
            {/* <div>{reservations[0].popup_store?.brand}</div> */}
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
                <th className="people">총인원</th>
                <th>전화번호</th>
                <th className="date">예약날짜</th>
                {currentList === "reservation" && (
                  <th className="time">예약시간</th>
                )}
              </tr>
            </thead>
            <tbody>
              {listToShow.map((item, index) => (
                <tr key={item._id}>
                  <td>{index + 1}</td>
                  <td>{item.user?.name}</td>
                  <td>{item.people}</td>
                  <td>{item.user?.phone_number}</td>
                  <td>
                    {typeof item.date === "string"
                      ? item.date.split("T")[0]
                      : "날짜 없음"}
                  </td>
                  <td>{item.hour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="emptyListMessage">목록이 비었습니다.</div>
        )}
      </div>
    </div>
  );
}
