// waitingModal.js
import React, { useState } from "react";
import "./waitingModal.scss";
import instance from "@/utils/instance";

const WaitingModal = ({ closeModal, popupStoreId }) => {
    const waitingPopupStoreId = popupStoreId;
    const [waitingDate, setWaitingDate] = useState("");
    const [waitingPeople, setWaitingPeople] = useState("");

    const submitWaiting = async () => {
        try {
            const response = await instance.post("/waiting/createWaiting", {
                date: waitingDate,
                people: waitingPeople,
                popup_store: waitingPopupStoreId,
            });
            closeModal();
        } catch (error) {
            console.error("현장대기에 실패했습니다", error);
        }
    };

    // 모달 내용 및 동작 구현
    return (
        <div className="waitingModal">
            <div className="overlay" onClick={closeModal}></div>
            <div className="waitingContent">
                <h2>팝업스토어 현장대기</h2>
                <div className="waitingInput">
                    <p>날짜</p>
                    <input
                        type="date"
                        name="totalPeople"
                        placeholder="날짜"
                        value={waitingDate}
                        onChange={(e) => setWaitingDate(e.target.value)}
                    />
                </div>
                <div className="waitingInput">
                    <p>인원</p>
                    <input
                        type="number"
                        name="waitingPeople"
                        placeholder="인원"
                        value={waitingPeople}
                        onChange={(e) => setWaitingPeople(e.target.value)}
                        required
                    />
                </div>

                <button type="button" className="reviewCompleteBtn" onClick={submitWaiting}>
                    현장대기 등록하기
                </button>
                <button type="button" className="reviewCloseBtn" onClick={closeModal}>
                    X
                </button>
            </div>
        </div>
    );
};

export default WaitingModal;
