// waitingModal.js
import React, { useState } from "react";
import "./waitingModal.scss";
import instance from "@/utils/instance";

const WaitingModal = ({ closeModal, popupStoreId, handleWaitingSubmit }) => {
    const waitingPopupStoreId = popupStoreId;
    const [waitingPeople, setWaitingPeople] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 로딩상태

    const submitWaiting = async () => {
        if (!waitingPeople) {
            window.alert("인원을 입력해주세요");
            return;
        }
        try {
            setIsLoading(true); // 로딩 시작
            const response = await instance.post("/waiting/createWaiting", {
                people: waitingPeople,
                popup: waitingPopupStoreId,
            });
            handleWaitingSubmit();
            closeModal();
        } catch (error) {
            console.log(error);
            alert("해당 팝업스토어에 이미 현장대기 완료했습니다.");
        } finally {
            setIsLoading(false); // 로딩 끝
        }
    };

    // 모달 내용 및 동작 구현
    return (
        <div className="waitingModal">
            <div className="loading-container" style={{ display: isLoading ? "flex" : "none" }}>
                <div className="loading-spinner"></div>
            </div>
            <div
                className="overlay"
                onClick={() => {
                    window.document.body.style.overflowY = "scroll";
                    closeModal();
                }}
            ></div>
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
                <button
                    type="button"
                    className="reviewCompleteBtn"
                    onClick={() => {
                        window.document.body.style.overflowY = "scroll";
                        submitWaiting();
                    }}
                >
                    현장대기 등록하기
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

export default WaitingModal;
