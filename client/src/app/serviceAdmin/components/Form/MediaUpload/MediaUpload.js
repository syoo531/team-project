"use client";

import "./MediaUpload.scss";
import { useRef } from "react";
import instance from "@/utils/instance";
import { deleteImageS3 } from "../../imageUploader";
import ImagePreview from "./ImagePreview";
import CustomUploadButton from "./CustomUploadButton";

export default function MediaUpload({
  newImages,
  setNewImages,
  existingImage = [],
  setExistingImage,
  mainImage = null,
  setMainImage,
}) {
  const inputRefs = useRef();
  const mainInput = useRef();

  const handleUploadImage = (e) => {
    const totalImages =
      parseInt(existingImage.length || 0) +
      parseInt(newImages.length || 0) +
      parseInt(e.target.files.length || 0);

    if (totalImages >= 6) {
      alert("상세이미지 최대 5개까지 올릴 수 있습니다.");
      return;
    } else {
      setNewImages((cur) => [...cur, ...e.target.files]);
    }
  };

  //새로 업로드한 이미지는 newImages state에서 제거
  const removeNewImage = (index) => {
    const confirm = window.confirm(
      "이미지를 삭제 하시면 복구할 수 없습니다. 그래도 삭제하시겠습니까?",
    );
    if (confirm) {
      const updatedImages = newImages.filter((_, i) => i !== index);
      setNewImages(updatedImages);
    }
  };

  //기존 이미지는 s3, 몽고DB에서 삭제
  const deleteExistingImage = async (img, id) => {
    const confirm = window.confirm(
      "이미지를 삭제 하시면 복구할 수 없습니다. 그래도 삭제하시겠습니까?",
    );

    if (confirm) {
      await Promise.all([
        deleteImageS3(img),
        instance.delete(`http://localhost:4000/api/popupStore/image/${id}`),
      ]);
      setExistingImage((prev) => prev.filter((img) => img._id !== id));
    }
  };

  return (
    <>
      <section className="form__media-section">
        <h2 className="media-title">메인 이미지</h2>
        <div
          className="image-upload-wrapper"
          style={{ width: "200px", height: "200px" }}
        >
          <CustomUploadButton
            onClick={() => mainInput.current.click()}
            overlayText={"메인 이미지 업로드"}
            onChange={(e) => setMainImage(e.target.files[0])}
            refName={mainInput}
          />
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
        <h2 className="media-title">상세 이미지</h2>
        <div className="form__detail-media">
          {existingImage?.length > 0 &&
            existingImage?.map((img) => (
              <ImagePreview
                key={img._id}
                uniqueId={img._id}
                deleteImage={() => deleteExistingImage(img.url, img._id)}
                image={img?.url}
              />
            ))}

          {/* 새로 업로드한 이미지 */}
          {newImages?.length > 0 &&
            newImages?.map((img, i) => (
              <ImagePreview
                key={i}
                uniqueId={i}
                deleteImage={() => removeNewImage(i)}
                image={URL.createObjectURL(img)}
              />
            ))}

          <div className="image-upload-wrapper">
            <CustomUploadButton
              onClick={() => inputRefs.current.click()}
              overlayText={"상세이미지 업로드"}
              onChange={handleUploadImage}
              refName={inputRefs}
              multiple
            />
          </div>
        </div>
      </section>
    </>
  );
}
