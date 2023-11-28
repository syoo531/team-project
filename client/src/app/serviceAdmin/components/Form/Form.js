"use client";

import "./Form.scss";
import { useRouter } from "next/navigation";
import MediaUpload from "./MediaUpload/MediaUpload";
import Postcode from "../Postcode/Postcode";
import { CATEGORY_OPTIONS } from "../../utils/constants";

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
  disableButton,
}) {
  const router = useRouter();

  const handleCancel = () => {
    router.push("/serviceAdmin/popupstore");
  };

  return (
    <div className="main-content__container">
      <div className="main__header form__header">
        {storeId ? (
          <>
            <h1>팝업스토어 수정</h1>
            <div className="action__menu">
              <button
                className="delete-btn"
                onClick={() => handleDelete(storeId)}
              >
                팝업스토어 삭제
              </button>
            </div>
          </>
        ) : (
          <h1>팝업스토어 등록</h1>
        )}
      </div>

      <div className="form__container">
        <form onSubmit={handleSubmit}>
          <section className="form__text-section">
            <div className="field short-field">
              <label>팝업스토어 이름</label>
              <input
                placeholder="팝업스토어 이름"
                type="text"
                name="name"
                value={formData?.name || ""}
                onChange={handleChange}
              />
            </div>
            <div className="field short-field">
              <label>브랜드 이름</label>
              <input
                placeholder="브랜드 이름"
                type="text"
                name="brand"
                value={formData?.brand || ""}
                onChange={handleChange}
              />
            </div>
            <div className="address_field field short-field">
              <label>주소 </label>
              <div className="zipcode">
                <input
                  className="zipcode-input"
                  placeholder="우편번호"
                  type="text"
                  name="zipcode"
                  onChange={handleChange}
                  value={formData?.zipcode || ""}
                />
                <Postcode setFormData={setFormData} />
              </div>
              <div className="address-input">
                <input
                  placeholder="주소"
                  type="text"
                  name="address"
                  onChange={handleChange}
                  value={formData?.address || ""}
                />
              </div>
              <div className="address-input">
                <input
                  placeholder="상세 주소"
                  type="text"
                  name="detail_address"
                  onChange={handleChange}
                  value={formData?.detail_address || ""}
                />
              </div>
            </div>

            <div className="category-selectbox__div field short-field">
              <label>카테고리</label>
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
            </div>

            <div className="date-field field short-field">
              <label>이벤트 기간</label>
              <input
                className="date-input"
                type="date"
                name="start_date"
                value={formData?.start_date?.split("T")[0] || ""}
                onChange={handleChange}
              />
              <label>~</label>
              <input
                className="date-input"
                type="date"
                name="end_date"
                value={formData?.end_date?.split("T")[0] || ""}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>소개</label>
              <input
                placeholder="이벤트 소개"
                className="form-summary"
                type="text"
                name="summary"
                value={formData?.summary || ""}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label>설명</label>
              <textarea
                placeholder="이벤트 상세 설명"
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
          <div className="form__buttons">
            <button
              className="submit-btn"
              type="submit"
              disabled={disableButton}
            >
              저장
            </button>
            <button className="cancel-btn" type="button" onClick={handleCancel}>
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
