// waitingModal.js
import React, { useState } from "react";
import "./waitingModal.scss";
import instance from "@/utils/instance";

const WaitingModal = ({ closeModal, popupStoreId, handleWaitingSubmit }) => {
    const waitingPopupStoreId = popupStoreId;
    console.log("waitingPopupStoreId :", waitingPopupStoreId);
    const [waitingPeople, setWaitingPeople] = useState("");

    const submitWaiting = async () => {
        try {
            const response = await instance.post("/waiting/createWaiting", {
                people: waitingPeople,
                popup: waitingPopupStoreId,
            });
            console.log("dd", response);
            handleWaitingSubmit();
            closeModal();
        } catch (error) {
            console.error("현장대기에 실패했습니다 여기?", error);
        }
    };

    // 모달 내용 및 동작 구현
    return (
        <div className="waitingModal">
            <div className="overlay" onClick={closeModal}></div>
            <div className="waitingContent">
                <h2>팝업스토어 현장대기</h2>
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
