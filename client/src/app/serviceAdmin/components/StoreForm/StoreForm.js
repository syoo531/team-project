"use client";

import "./StoreForm.scss";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { s3imageUploader, deleteAllS3 } from "../imageUploader";

const StoreForm = ({
  name,
  brand,
  category,
  address,
  location,
  summary,
  description,
  start_date,
  end_date,
  image, //이미지 url 담긴 객체
  storeId,
}) => {
  const router = useRouter();

  const nameRef = useRef();
  const brandRef = useRef();
  const categoryRef = useRef();
  const addressRef = useRef();
  const locationRef = useRef();
  const summaryRef = useRef();
  const descriptionRef = useRef();
  const start_dateRef = useRef();
  const end_dateRef = useRef();

  const imageInitialState = {
    main_image_url: "",
    thumbnail_image_url: "",
    detail_image_url: "",
  };

  const existingImageState = {
    main_image_url: image?.main_image_url || "",
    thumbnail_image_url: image?.thumbnail_image_url || "",
    detail_image_url: image?.detail_image_url || "",
  };

  //const [form, setForm] = useState(formIntialState);
  const [newImages, setNewImages] = useState(imageInitialState);
  const [error, setError] = useState({});
  const [existingImage, setExistingImage] = useState(existingImageState);

  const createPopupStore = async (formData) => {
    const imageURL = await s3imageUploader(newImages, false);
    const updatedFormData = { ...formData, ...imageURL };
    const { data } = await axios.post(
      `http://localhost:4000/api/popupStore`,
      updatedFormData
    );
    console.log("store created", data);
  };

  const updatePopupStore = async (formData) => {
    const newImageUrl = await s3imageUploader(newImages, existingImage);
    console.log("updated image URLS", newImageUrl);
    const updatedFormData = { ...formData, ...newImageUrl };
    const { data } = await axios.patch(
      `http://localhost:4000/api/popupStore/${storeId}`,
      updatedFormData
    );
    console.log("store updated", data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: nameRef.current.value,
        brand: brandRef.current.value,
        category: categoryRef.current.value,
        address: addressRef.current.value,
        location: locationRef.current.value,
        summary: summaryRef.current.value,
        description: descriptionRef.current.value,
        start_date: start_dateRef.current.value,
        end_date: end_dateRef.current.value,
      };

      if (storeId) {
        await updatePopupStore(formData);
        router.push("/serviceAdmin");
        router.refresh();
        return;
      } else {
        await createPopupStore(formData);
        router.push("/serviceAdmin");
        router.refresh();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = window.confirm("삭제하시겠습니까?");
      if (!result) return;

      const {
        data: { image },
      } = await axios.get(`http://localhost:4000/api/popupStore/${id}`);

      const imageArray = [
        image.main_image_url,
        image.thumbnail_image_url,
        image.detail_image_url,
      ].filter((v) => v !== undefined && v !== null);

      //S3와 몽고DB 데이터 한번에 삭제
      const res = await Promise.all([
        deleteAllS3(imageArray),
        axios.delete(`http://localhost:4000/api/popupStore/${id}`),
      ]);
      console.log(res);
      router.push("/serviceAdmin");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="main__header form__header">
        <h1>팝업스토어 등록</h1>
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
          <div className="form__text-section">
            <div className="form__field">
              <label>팝업스토어 이름</label>
              <input
                type="text"
                name="name"
                ref={nameRef}
                defaultValue={name || ""}
              />
            </div>
            <div>
              <label>브랜드 이름</label>
              <input
                type="text"
                name="brand"
                ref={brandRef}
                defaultValue={brand || ""}
              />
            </div>
            <div>
              <label>카테고리</label>
              <input
                type="text"
                name="category"
                ref={categoryRef}
                defaultValue={category || ""}
              />
            </div>
            <div>
              <label>주소</label>
              <input
                type="text"
                name="address"
                ref={addressRef}
                defaultValue={address || ""}
              />
            </div>
            <div>
              <label>지역</label>
              <input
                type="text"
                name="location"
                ref={locationRef}
                defaultValue={location || ""}
              />
            </div>
            <div>
              <label>소개</label>
              <input
                className="form-summary"
                type="text"
                name="summary"
                ref={summaryRef}
                defaultValue={summary || ""}
              />
            </div>
            <div>
              <label>설명</label>
              <input
                className="form-description"
                type="text"
                name="description"
                ref={descriptionRef}
                defaultValue={description || ""}
              />
            </div>
            <div>
              <label>이벤트 시작일</label>
              <input
                type="text"
                name="start_date"
                ref={start_dateRef}
                defaultValue={start_date?.split("T")[0] || ""}
              />
            </div>
            <div>
              <label>이벤트 종료일</label>
              <input
                type="text"
                name="end_date"
                ref={end_dateRef}
                defaultValue={end_date?.split("T")[0] || ""}
              />
            </div>
          </div>

          <div className="form__media-section">
            <h1 className="section-title">이미지 업로드</h1>
            <label>
              메인 이미지:
              <input
                type="file"
                name="main_image_url"
                onChange={(e) =>
                  setNewImages((cur) => ({
                    ...cur,
                    main_image_url: e.target.files[0],
                  }))
                }
              />
            </label>
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
                onChange={(e) =>
                  setNewImages((cur) => ({
                    ...cur,
                    detail_image_url: e.target.files[0],
                  }))
                }
              />
            </label>

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
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={() => router.push("/serviceAdmin")}>
            취소
          </button>
        </form>
      </div>
    </>
  );
};

export default StoreForm;
