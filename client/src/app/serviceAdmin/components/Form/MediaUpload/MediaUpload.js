"use client";

import "./MediaUpload.scss";
import { useState, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

export default function MediaUpload({
  setNewImages,
  newImages,
  existingImage,
  setExistingImage,
  storeId,
}) {
  const inputRefs = useRef({});

  const handleUploadImage = (e) => {
    // if (e.target.files[0])
    setNewImages((cur) => ({
      ...cur,
      [e.target.name]: e.target.files[0],
    }));
  };

  const inputFields = [
    { name: "main_image_url", label: "메인 이미지" },
    { name: "thumbnail_image_url", label: "썸네일 이미지" },
    { name: "detail_image_url", label: "상세 이미지" },
  ];

  const renderImagePreview = (newImage, existingImage) => {
    return (
      <>
        {newImage || existingImage ? (
          <img
            src={newImage ? URL.createObjectURL(newImage) : existingImage}
            alt="이미지 미리보기"
          />
        ) : null}
      </>
    );
  };

  return (
    <section className="form__media-section">
      <h2 style={{ marginBottom: "20px" }}>Media</h2>
      <div className="form__media-flex">
        {inputFields.map((field) => (
          <div key={field.name} className="image-upload-wrapper">
            <div
              className="image-upload-custom-buttom"
              onClick={() => inputRefs.current[field.name].click()}
            >
              <FontAwesomeIcon icon={faFileArrowUp} beat />
              <div>{field.label}</div>
              <input
                className="fileInput"
                type="file"
                accept="image/*"
                name={field.name}
                onChange={handleUploadImage}
                ref={(input) => (inputRefs.current[field.name] = input)}
              />
            </div>
            <div className="image-preview">
              {renderImagePreview(
                newImages?.[field.name],
                existingImage?.[field.name]
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
