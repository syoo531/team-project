// reservationModal.js
import React, { useState } from "react";
import "./reservationModal.scss";
import instance from "@/utils/instance";

const ReservationModal = ({ closeModal, handleReservationSubmit, popupStoreId, setIsReservationCompleted }) => {
    const reservationPopupStoreId = popupStoreId;
    const [reservationDate, setReservationDate] = useState("");
    const [reservationHour, setReservationHour] = useState("");
    const [reservationPeople, setReservationPeople] = useState("");
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
        try {
            const response = await instance.post("/reservation", {
                date: reservationDate,
                hour: reservationHour,
                people: reservationPeople,
                popup_store: reservationPopupStoreId,
            });
            closeModal();
            handleReservationSubmit(); // 여기서 함수를 호출합니다.

        } catch (error) {
            console.error("사전예약 작성에 실패하였습니다", error);
        }
    };

    // 모달 내용 및 동작 구현
    return (
        <div className="reservationModal">
            <div className="overlay" onClick={closeModal}></div>
            <div className="reservationContent">
                <h2>팝업스토어 사전예약</h2>
                <div className="reservationInput">
                    <p>날짜</p>
                    <input
                        type="date"
                        name="totalPeople"
                        placeholder="날짜"
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                    />
                </div>
                <div className="reservationInput">
                    <p>시간</p>
                    <select value={reservationHour} onChange={(e) => setReservationHour(e.target.value)}>
                        <option value="" disabled>
                            시간 선택
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

                <button type="button" className="reviewCompleteBtn" onClick={submitReservation}>
                    사전예약하기
                </button>
                <button type="button" className="reviewCloseBtn" onClick={closeModal}>
                    X
                </button>
            </div>
        </div>
    );
};

export default ReservationModal;
