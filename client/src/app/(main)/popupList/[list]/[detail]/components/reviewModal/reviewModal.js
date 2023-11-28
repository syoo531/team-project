// components/ReviewModal.js
import React, { useState } from "react";
import axios from "axios";
import "./reviewModal.scss";
import instance from "@/utils/instance";
import { s3UploadMultipleImages } from "../../../../../../serviceAdmin/components/imageUploader"; // 경로를 실제 파일 위치에 맞게 수정해주세요.

const ReviewModal = ({ closeModal, handleReviewSubmit, popupStoreId }) => {
    console.log("modal popupStoreId :", popupStoreId);
    const [reviewContent, setReviewContent] = useState("");
    const [selectedImages, setSelectedImages] = useState([]);
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
            const imageData = await s3UploadMultipleImages(selectedImages);

            const response = await instance.post("/review/createReview", {
                text: reviewContent,
                image: imageData,
                popupStoreId,
            });
            handleReviewSubmit(reviewContent, imageData);
            setIsReviewSubmitted(true);
            closeModal();
        } catch (error) {
            console.error("리뷰 작성에 실패했습니다.", error);
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
                {/* 이미지 선택 기능 추가 */}
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
