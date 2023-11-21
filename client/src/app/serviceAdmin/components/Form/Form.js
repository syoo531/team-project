"use client";

import "./Form.scss";
import MediaUpload from "./MediaUpload/MediaUpload";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { s3imageUploader, deleteAllS3 } from "../imageUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

const Form = ({
  formData,
  storeId,
  handleChange,
  handleDelete,
  handleSubmit,
  setNewImages,
  newImages,
  existingImage,
  setExistingImage,
  renderImagePreview,
}) => {
  const router = useRouter();

  //카테고리 selectbox options 정의
  const CATEGORY_OPTIONS = [
    "토이",
    "뷰티",
    "패션",
    "음식",
    "예술",
    "주류",
    "게임",
    "전자기기",
    "가구",
    "캐릭터",
    "럭셔리",
    "카페",
    "아이돌",
  ];

  return (
    <div className="main-content__layout">
      <div className="main-content__container">
        <div className="main__header form__header">
          <h1>팝업스토어 수정</h1>
          <div className="action__menu">
            <button
              className="delete-button"
              onClick={() => handleDelete(storeId)}
            >
              팝업스토어 삭제
            </button>
          </div>
        </div>

        <div className="form__container">
          <form onSubmit={handleSubmit}>
            <section className="form__text-section">
              <div>
                <label>팝업스토어 이름</label>
                <input
                  type="text"
                  name="name"
                  value={formData?.name || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>브랜드 이름</label>
                <input
                  type="text"
                  name="brand"
                  value={formData?.brand || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="category-selectbox__div">
                <label>
                  카테고리
                  <select
                    className="category-selectbox"
                    name="category"
                    value={formData?.category || ""}
                    onChange={handleChange}
                  >
                    <option value="" disabled hidden>
                      선택
                    </option>
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div>
                <label>주소</label>
                <input
                  type="text"
                  name="address"
                  value={formData?.address || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>지역</label>
                <input
                  type="text"
                  name="location"
                  value={formData?.location || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>소개</label>
                <input
                  className="form-summary"
                  type="text"
                  name="summary"
                  value={formData?.summary || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>설명</label>
                <textarea
                  className="form-description"
                  type="text"
                  name="description"
                  value={formData?.description || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>이벤트 시작일</label>
                <input
                  type="date"
                  name="start_date"
                  value={formData?.start_date?.split("T")[0] || ""}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label>이벤트 종료일</label>
                <input
                  type="date"
                  name="end_date"
                  value={formData?.end_date?.split("T")[0] || ""}
                  onChange={handleChange}
                />
              </div>
            </section>

            <MediaUpload
              setNewImages={setNewImages}
              newImages={newImages}
              existingImage={existingImage}
              setExistingImage={setExistingImage}
              renderImagePreview={renderImagePreview}
              storeId={storeId}
            />

            {/* 사진 업로드 구간 */}
            {/* <section className="form__media-section">
              <h2 style={{ marginBottom: "10px" }}>Media</h2>
              <div className="form__media-flex">
                <div className="main-image-upload-wrapper">
                  <div
                    className="image-upload-custom-buttom"
                    onClick={() => mainImageRef.current.click()}
                  >
                    <FontAwesomeIcon icon={faFileArrowUp} beat />
                    <div>메인 이미지</div>
                    <input
                      className="fileInput"
                      type="file"
                      ref={mainImageRef}
                      accept="image/*"
                      name="main_image_url"
                      onChange={(e) => {
                        const selectedFile = e.target.files[0];
                        if (selectedFile) {
                          setNewImages((cur) => ({
                            ...cur,
                            main_image_url: selectedFile,
                          }));
                        }
                      }}
                    />
                  </div>
                  <div className="image-preview">
                    {renderImagePreview(
                      newImages?.main_image_url,
                      existingImage?.main_image_url
                    )}
                  </div>
                </div>

                <div>
                  <div className="image-upload-wrapper">
                    <div
                      className="image-upload-custom-buttom"
                      onClick={() => thumbnailRef.current.click()}
                    >
                      <FontAwesomeIcon icon={faFileArrowUp} beat />
                      <div>상세 이미지</div>
                      <input
                        className="fileInput"
                        type="file"
                        ref={thumbnailRef}
                        accept="image/*"
                        name="thumbnail_image_url"
                        onChange={(e) => {
                          const selectedFile = e.target.files[0];
                          if (selectedFile) {
                            setNewImages((cur) => ({
                              ...cur,
                              thumbnail_image_url: selectedFile,
                            }));
                          }
                        }}
                      />
                    </div>
                    <div className="image-preview">
                      {renderImagePreview(
                        newImages?.thumbnail_image_url,
                        existingImage?.thumbnail_image_url
                      )}
                    </div>
                  </div>
                  <div className="image-upload-wrapper">
                    <div
                      className="image-upload-custom-buttom"
                      onClick={() => detailImageRef.current.click()}
                    >
                      <FontAwesomeIcon icon={faFileArrowUp} beat />
                      <div>상세 이미지</div>
                      <input
                        className="fileInput"
                        type="file"
                        ref={detailImageRef}
                        accept="image/*"
                        name="detail_image_url"
                        onChange={(e) => {
                          const selectedFile = e.target.files[0];
                          if (selectedFile) {
                            setNewImages((cur) => ({
                              ...cur,
                              detail_image_url: selectedFile,
                            }));
                          }
                        }}
                      />
                    </div>
                    <div className="image-preview">
                      {renderImagePreview(
                        newImages?.detail_image_url,
                        existingImage?.detail_image_url
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section> */}

            {/* <section className="form__media-section">
              <h1 className="section-title">이미지 업로드</h1>
            
              <hr></hr>

              <div className="image-upload-wrapper">
                <div className="image-upload-custom-buttom">
                <FontAwesomeIcon icon={faFileArrowUp} beat style={{color: "#092a62",}} />
                  <label>메인 이미지</label>
                  <input
                    type="file"
                    accept="image/*"
                    name="main_image_url"
                    onChange={(e) =>
                      setNewImages((cur) => ({
                        ...cur,
                        main_image_url: e.target.files[0],
                      }))
                    }
                  />
                </div>
                <div
                  style={{
                    border: "1px solid grey",
                    width: "200px",
                    height: "150px",
                  }}
                >
                  {newImages.main_image_url && (
                    <img
                      style={{ width: "200px" }}
                      src={window.URL.createObjectURL(newImages.main_image_url)}
                    />
                  )}
                </div>
              </div>         

              <br></br>
              <label>
                썸네일 이미지:
                <input
                  type="file"
                  name="thumbnail_image_url"
                  onChange={(e) =>
                    setNewImages((cur) => ({
                      ...cur,
                      thumbnail_image_url: e.target.files[0],
                    }))
                  }
                />
              </label>
              <br></br>
              <label>
                상세 이미지:
                <input
                  type="file"
                  name="detail_image_url"
                  onChange={handleUploadImage}
                />
              </label>

              <br></br>
              <hr></hr>

              <img
                style={{ width: "200px" }}
                src={existingImage?.main_image_url}
              />
              <img
                style={{ width: "200px" }}
                src={existingImage?.thumbnail_image_url}
              />
              <img
                style={{ width: "200px" }}
                src={existingImage?.detail_image_url}
              />
            </section> */}

            <button type="submit">Submit</button>
            <button type="button" onClick={() => router.push("/serviceAdmin")}>
              취소
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
