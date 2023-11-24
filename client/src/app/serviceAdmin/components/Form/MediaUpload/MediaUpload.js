"use client";

import "./MediaUpload.scss";
import { useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { deleteImageS3 } from "../../imageUploader";

export default function MediaUpload({
  newImages,
  setNewImages,
  existingImage = [],
  setExistingImage,
  mainImage,
  setMainImage,
}) {
  const inputRefs = useRef();
  const mainInput = useRef();

  const handleUploadImage = (e) => {
    const totalImages =
      parseInt(existingImage.length || 0) +
      parseInt(newImages.length || 0) +
      parseInt(e.target.files.length || 0);

    if (totalImages >= 5) {
      alert("상세이미지 최대 5개까지 올릴 수 있습니다.");
      return;
    } else {
      setNewImages((cur) => [...cur, ...e.target.files]);
    }
  };

  const removeNewImage = (index) => {
    const confirm = window.confirm(
      "이미지를 삭제 하시면 복구할 수 없습니다. 그래도 삭제하시겠습니까?"
    );
    if (confirm) {
      const updatedImages = newImages.filter((_, i) => i !== index);
      setNewImages(updatedImages);
    }
  };

  const deleteFroms3 = async (img, id) => {
    const confirm = window.confirm(
      "이미지를 삭제 하시면 복구할 수 없습니다. 그래도 삭제하시겠습니까?"
    );

    if (confirm) {
      await Promise.all([
        deleteImageS3(img),
        axios.delete(`http://localhost:4000/api/popupStore/image/${id}`),
      ]);
      setExistingImage((prev) => prev.filter((img) => img._id !== id));
    }
  };

  const handleMainImage = (e) => {
    setMainImage(e.target.files[0]);
  };

  return (
    <>
      <section className="form__media-section">
        <h2 style={{ marginBottom: "20px" }}>메인 이미지</h2>
        <div className="main-image-upload-wrapper">
          <div
            className="image-upload-custom-buttom"
            onClick={() => mainInput.current.click()}
          >
            <FontAwesomeIcon icon={faFileArrowUp} />
            <div className="overlay-text">메인 이미지 업로드</div>
            <input
              className="fileInput"
              type="file"
              accept="image/*"
              name="main"
              onChange={handleMainImage}
              ref={mainInput}
            />
          </div>
          <div className="image-preview">
            {mainImage?.url ? (
              <img src={mainImage.url} />
            ) : mainImage instanceof Blob ? (
              <img src={URL.createObjectURL(mainImage)} />
            ) : null}
          </div>
        </div>
      </section>

      {/* 기존 이미지 */}
      <section className="form__media-section">
        <h2 style={{ marginBottom: "20px" }}>상세 이미지</h2>
        <div className="form__detail-media">
          {Array.isArray(existingImage) &&
            existingImage?.map((img) => (
              <div key={img._id} className="image-upload-wrapper">
                <div
                  className="image-upload-custom-buttom"
                  onClick={() => deleteFroms3(img.url, img._id)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
                <div className="image-preview">
                  <img key={img._id} src={img.url} />
                </div>
              </div>
            ))}

          {/* 새로운 이미지 */}
          {Array.isArray(newImages) &&
            newImages?.map((image, i) => (
              <div key={i} className="image-upload-wrapper">
                <div
                  className="image-upload-custom-buttom"
                  onClick={() => removeNewImage(i)}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </div>
                <div className="image-preview">
                  <img key={i} src={URL.createObjectURL(image)} />
                </div>
              </div>
            ))}

          <div className="image-upload-wrapper">
            <div
              className="image-upload-custom-buttom"
              onClick={() => inputRefs.current.click()}
            >
              <FontAwesomeIcon icon={faFileArrowUp} />
              <div className="overlay-text">상세이미지 업로드</div>
              <input
                className="fileInput"
                type="file"
                accept="image/*"
                name="fileupload"
                onChange={handleUploadImage}
                ref={inputRefs}
                multiple
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
