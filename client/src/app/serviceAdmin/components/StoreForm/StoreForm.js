"use client";

import "./StoreForm.scss";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { s3imageUploader } from "../imageUploader";

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
      `http://localhost:4000/popupStore`,
      updatedFormData
    );
    console.log("store created", data);
  };

  const updatePopupStore = async (formData) => {
    const newImageUrl = await s3imageUploader(newImages, existingImage);
    console.log("updated image URLS", newImageUrl);
    const updatedFormData = { ...formData, ...newImageUrl };
    const { data } = await axios.patch(
      `http://localhost:4000/popupStore/${storeId}`,
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            팝업스토어 이름:
            <input
              type="text"
              name="name"
              ref={nameRef}
              defaultValue={name || ""}
            />
          </label>
        </div>
        <div>
          <label>
            브랜드 이름:
            <input
              type="text"
              name="brand"
              ref={brandRef}
              defaultValue={brand || ""}
            />
          </label>
        </div>
        <div>
          <label>
            카테고리:
            <input
              type="text"
              name="category"
              ref={categoryRef}
              defaultValue={category || ""}
            />
          </label>
        </div>
        <div>
          <label>
            주소:
            <input
              type="text"
              name="address"
              ref={addressRef}
              defaultValue={address || ""}
            />
          </label>
        </div>
        <div>
          <label>
            지역:
            <input
              type="text"
              name="location"
              ref={locationRef}
              defaultValue={location || ""}
            />
          </label>
        </div>
        <div>
          <label>
            소개:
            <input
              type="text"
              name="summary"
              ref={summaryRef}
              defaultValue={summary || ""}
            />
          </label>
        </div>
        <div>
          <label>
            설명:
            <input
              type="text"
              name="description"
              ref={descriptionRef}
              defaultValue={description || ""}
            />
          </label>
        </div>
        <div>
          <label>
            이벤트 시작일:
            <input
              type="text"
              name="start_date"
              ref={start_dateRef}
              defaultValue={start_date?.split('T')[0] || ""}
            />
          </label>
        </div>
        <div>
          <label>
            이벤트 종료일:
            <input
              type="text"
              name="end_date"
              ref={end_dateRef}
              defaultValue={end_date?.split('T')[0] || ""}
            />
          </label>
        </div>

        <div>
          <div className="container-image-upload">
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
          </div>

          <img style={{ width: "200px" }} src={existingImage?.main_image_url} />
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
    </>
  );
};

export default StoreForm;
