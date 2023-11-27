// components/ReviewModal.js
import React, { useState } from "react";
import axios from "axios";
import "./reviewModal.scss";

const ReviewModal = ({ closeModal, handleReviewSubmit, postId }) => {
    // const myToken =
    //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJuYW1lIjoiWUVFVU4gTEVFIiwiZW1haWwiOiJhbXkwMDA4MDlAZ21haWwuY29tIn0sImlhdCI6MTcwMDkwNjU5OSwiZXhwIjoxNzAwOTkyOTk5fQ.jY7Crie-uuk-T19FVSe9x8zN2Nr0OaYmVXQJcydwObE";
    const [reviewContent, setReviewContent] = useState("");
    const handleContentChange = (event) => {
        setReviewContent(event.target.value);
    };
    const submitReview = async () => {
        try {
            console.log("액시오스 요청 전");
            const response = await axios.post(
                "http://localhost:4000/api/review/createReview",
                { text: reviewContent } // text 속성을 body 속성으로 변경
                // {
                //     headers: {
                //         Authorization: `Bearer ${myToken}`,
                //         // 여기서 'Bearer'는 토큰 타입에 따라 다를 수 있습니다. 서버에 따라 다를 수 있으니 확인이 필요합니다.
                //     },
                // }
            );
            console.log("액시오스 요청 후");
            handleReviewSubmit(postId, reviewContent);
            closeModal();
        } catch (error) {
            console.error("리뷰 작성에 실패했습니다.", error);
            // 실패 시에 대한 처리를 추가할 수 있습니다.
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
                <button type="button" className="reviewCompleteBtn" onClick={submitReview}>
                    작성완료
                </button>
                <button type="button" className="reviewCloseBtn" onClick={closeModal}>
                    X
                </button>
            </div>
        </div>
    );
};

export default ReviewModal;
