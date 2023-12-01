// reservationModal.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./reservationModal.scss";
import instance from "@/utils/instance";

const ReservationModal = ({
    closeModal,
    handleReservationSubmit,
    popupStoreId,
    setIsReservationCompleted,
    startDate,
    endDate,
}) => {
    const reservationPopupStoreId = popupStoreId;
    const limitedStartDate = startDate.split("T")[0];
    const limitedEndDate = endDate.split("T")[0];
    const [reservationDate, setReservationDate] = useState("");
    const [reservationHour, setReservationHour] = useState("");
    const [reservationPeople, setReservationPeople] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 로딩상태
    const timeOptions = [
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM",
        "4:30 PM",
        "5:00 PM",
        "5:30 PM",
        "6:00 PM",
    ];

    const submitReservation = async () => {
        if (!reservationDate) {
            window.alert("날짜를 입력해주세요");
            return;
        } else if (!reservationHour) {
            window.alert("시간을 입력해주세요");
            return;
        } else if (!reservationPeople) {
            window.alert("인원을 입력해주세요");
            return;
        }

        //예약하기
        try {
            setIsLoading(true); // 로딩 시작
            // 수동으로 포맷 만들기
            const formattedDate = `${reservationDate.getFullYear()}-${(reservationDate.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${reservationDate.getDate().toString().padStart(2, "0")}T00:00:00.000Z`;
            const response = await instance.post("/reservation", {
                date: formattedDate,
                hour: reservationHour,
                people: reservationPeople,
                popup_store: reservationPopupStoreId,
            });
            closeModal();
            handleReservationSubmit(); // 여기서 함수를 호출합니다.
        } catch (error) {
            console.error("사전예약 작성에 실패하였습니다", error);
        } finally {
            setIsLoading(false); // 로딩 끝
        }
    };

    // 모달 내용 및 동작 구현
    return (
        <div className="reservationModal">
            <div
                className="overlay"
                onClick={() => {
                    window.document.body.style.overflowY = "scroll";
                    closeModal();
                }}
            ></div>
            <div className="reservationContent">
                <div className="loading-container" style={{ display: isLoading ? "flex" : "none" }}>
                    <div className="loading-spinner"></div>
                </div>
                <h2>팝업스토어 사전예약</h2>
                <div className="reservationInput">
                    <p>날짜</p>
                    <Calendar
                        onChange={setReservationDate}
                        value={reservationDate}
                        minDate={new Date(limitedStartDate)}
                        maxDate={new Date(limitedEndDate)}
                    />
                </div>
                <div className="reservationInput">
                    <p>시간</p>
                    <select value={reservationHour} onChange={(e) => setReservationHour(e.target.value)}>
                        <option value="" disabled>
                            시간 선택 ▾
                        </option>
                        {timeOptions.map((time, index) => (
                            <option key={index} value={time}>
                                {time}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="reservationInput">
                    <p>인원</p>
                    <input
                        type="number"
                        name="reservationPeople"
                        placeholder="인원"
                        value={reservationPeople}
                        onChange={(e) => setReservationPeople(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="button"
                    className="reviewCompleteBtn"
                    onClick={() => {
                        window.document.body.style.overflowY = "scroll";
                        submitReservation();
                    }}
                >
                    사전예약하기
                </button>
                <button
                    type="button"
                    className="reviewCloseBtn"
                    onClick={() => {
                        window.document.body.style.overflowY = "scroll";
                        closeModal();
                    }}
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default ReservationModal;
