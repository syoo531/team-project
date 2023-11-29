"use client";
import { useState } from "react";
import "./reviewCard.scss";
import instance from "@/utils/instance";

export default function ReviewCard({ data, onSubmit }) {
  const [isModal, setIsModal] = useState(false);
  const [formData, setFormData] = useState({
    name: data.name,
    text: data.text,
  });

  const handleModal = (e) => {
    e.preventDefault();
    setIsModal(!isModal);
  };
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await instance.put("/review/updateReview", {
      formData,
      reviewID: data._id,
    });
    onSubmit();
    setIsModal(!isModal);
  };
  const handleDelete = async (e) => {
    e.preventDefault();
    const res = await instance.delete(`/review/deleteReview/${data._id}`);
    setIsModal(!isModal);
    onSubmit();
  };
  return (
    <div className="reviewCardContainer">
      <div className="Card" onClick={handleModal}>
        <div className="imgWrapper">
          {data.image[0] ? (
            <img src={`${data.image[0].url}`} alt={`${data.image[0].key}`} />
          ) : (
            <img
              src="https://mybucket-elice.s3.ap-southeast-2.amazonaws.com/1701062364191-23031303SS_dounut_slide1.png"
              alt="defaultImage"
            />
          )}
        </div>
        <div className="dataWrapper">
          <div className="popupName">{data.popup_store.name}</div>
          <div className="name">{data.name}</div>
          <div className="text">{data.text}</div>
        </div>
      </div>
      {isModal ? (
        <>
          <div className="modalBackground" onClick={handleModal}></div>
          <div className="modalContainer">
            <form onSubmit={handleFormSubmit}>
              <div className="fixReview">리뷰수정</div>
              <input
                className="nameInput"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <textarea
                className="textInput"
                name="text"
                value={formData.text}
                onChange={handleInputChange}
              />
              <div className="btnBox">
                <input className="submitBtn" type="submit" value="수정하기" />
                <button className="deleteBtn" onClick={handleDelete}>
                  리뷰삭제
                </button>
              </div>
            </form>
            <button className="cancelBtn" onClick={handleModal}>
              X
            </button>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
