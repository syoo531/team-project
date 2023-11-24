// components/ReviewModal.js
import React, { useState } from "react";
import axios from "axios";
import "./reviewModal.scss";

const ReviewModal = ({ closeModal, handleReviewSubmit, postId }) => {
    const [reviewContent, setReviewContent] = useState("");
    const handleContentChange = (event) => {
        setReviewContent(event.target.value);
    };
    const submitReview = async () => {
        //공백체크
        if (reviewContent.trim() !== "") {
            try {
                // 서버에 리뷰 작성 요청을 보냄
                const response = await axios.post("http://localhost:4000/api/review/createReview", {
                    text: reviewContent,
                });

                // 리뷰 작성이 성공하면 부모 컴포넌트로 전달
                handleReviewSubmit(postId, reviewContent);
                closeModal();
            } catch (error) {
                console.error("리뷰 작성에 실패했습니다.", error);
                // 실패 시에 대한 처리를 추가할 수 있습니다.
            }
        }
    };

    return (
        <div className="reviewModal">
            <div className="overlay" onClick={closeModal}></div>
            <div className="modalContent">
                <h2>리뷰 작성</h2>
                <div className="reviewText">
                    <textarea
                        name="review"
                        id="review"
                        cols="30"
                        rows="10"
                        value={reviewContent}
                        onChange={handleContentChange}
                    ></textarea>
                </div>
                <button type="button" onClick={submitReview}>
                    작성완료
                </button>
                <button onClick={closeModal}>X</button>
            </div>
        </div>
    );
};

export default ReviewModal;
