"use client";

import "./Form.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import MediaUpload from "./MediaUpload/MediaUpload";
import Postcode from "../Postcode/Postcode";

export default function Form({
  formData,
  setFormData,
  storeId,
  handleChange,
  handleDelete,
  handleSubmit,
  setNewImages,
  newImages,
  existingImage,
  setExistingImage,
  mainImage,
  setMainImage,
}) {
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

              <div className="date-field">
                <label>기간</label>
                <input
                  className="date-input"
                  type="date"
                  name="start_date"
                  value={formData?.start_date?.split("T")[0] || ""}
                  onChange={handleChange}
                />
                <div> ~ </div>
                <input
                  className="date-input"
                  type="date"
                  name="end_date"
                  value={formData?.end_date?.split("T")[0] || ""}
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

              <div className="address_search">
                <label>주소 </label>
                <div className="address-input">
                  <Postcode setFormData={setFormData} />
                  <input
                    placeholder="주소"
                    type="text"
                    name="address"
                    onChange={handleChange}
                    value={formData?.address}
                  />
                </div>
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
            </section>

            <MediaUpload
              setNewImages={setNewImages}
              newImages={newImages}
              existingImage={existingImage}
              setExistingImage={setExistingImage}
              mainImage={mainImage}
              setMainImage={setMainImage}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => router.push("/serviceAdmin")}>
              취소
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
