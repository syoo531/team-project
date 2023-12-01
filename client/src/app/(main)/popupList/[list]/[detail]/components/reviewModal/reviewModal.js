// components/ReviewModal.js
import React, { useState } from "react";
import axios from "axios";
import "./reviewModal.scss";
import instance from "@/utils/instance";
import { s3UploadMultipleImages } from "../../../../../../serviceAdmin/components/imageUploader"; // 경로를 실제 파일 위치에 맞게 수정해주세요.

const ReviewModal = ({ closeModal, handleReviewSubmit, popupStoreId, setIsReviewSubmitted }) => {
    const [reviewContent, setReviewContent] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); // 로딩상태
    const handleContentChange = (event) => {
        setReviewContent(event.target.value);
    };
    const handleImageChange = (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files);
        setSelectedImages((prevImages) => [...prevImages, ...filesArray]);
    };

    const handleRemoveImage = (index) => {
        setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    const submitReview = async () => {
        try {
            setIsLoading(true); // 로딩 시작
            const imageData = await s3UploadMultipleImages(selectedImages);
            setIsReviewSubmitted(true); //! 순서 바꿈 > handleReviewSubmit 함수에서 false로 다시 바꿔줘서 리렌더링하게 함
            if (selectedImages.length < 1) {
                // 이미지가 1개 이상이어야 합니다.
                window.alert("후기작성을 하기 위해서는 이미지가 1개 이상 있어야합니다.");
                setIsLoading(false); // 로딩 종료
                return;
            }

            const response = await instance.post("/review/createReview", {
                text: reviewContent,
                image: imageData,
                popupStoreId,
            });
            handleReviewSubmit(reviewContent, imageData);
        } catch (error) {
            console.error("리뷰 작성에 실패했습니다.", error);
            window.alert("방문했던 팝업스토어에만 후기를 작성할수있습니다.");
            setIsLoading(false); // 로딩 종료
        } finally {
            setIsLoading(false); // 로딩 종료
        }
    };

    return (
        <div className="reviewModal">
            <div
                className="overlay"
                onClick={() => {
                    window.document.body.style.overflowY = "scroll";
                    closeModal();
                }}
            ></div>

            <div className="modalContent">
                <div className="loading-container" style={{ display: isLoading ? "flex" : "none" }}>
                    <div className="loading-spinner"></div>
                </div>
                <h2>리뷰 작성</h2>
                <div className="reviewText">
                    <textarea
                        name="review"
                        placeholder="리뷰를 작성해주세요!"
                        id="review"
                        cols="30"
                        rows="10"
                        value={reviewContent}
                        onChange={handleContentChange}
                    ></textarea>
                </div>
                <div className="selectedImgWrap">
                    {selectedImages.map((image, index) => (
                        <div key={index} className="selected-image">
                            <img src={URL.createObjectURL(image)} alt={`Selected ${index + 1}`} />
                            <button type="button" onClick={() => handleRemoveImage(index)}>
                                X
                            </button>
                        </div>
                    ))}
                </div>
                <input type="file" name="images" id="images" multiple onChange={handleImageChange} />
                <label htmlFor="images">
                    이미지
                    <br />
                    파일선택
                </label>
                {/* 이미지 선택 기능 추가 */}
                <button
                    type="button"
                    className="reviewCompleteBtn"
                    onClick={() => {
                        window.document.body.style.overflowY = "scroll";
                        submitReview();
                    }}
                >
                    작성완료
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

export default ReviewModal;
