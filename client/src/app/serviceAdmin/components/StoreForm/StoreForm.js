"use client";

import "./StoreForm.scss";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { imageUploader } from "../imageUploader";

const StoreForm = ({ storeData, storeId }) => {
  const router = useRouter();

  const name = useRef();
  const brand = useRef();
  const category = useRef();
  const address = useRef();
  const location = useRef();
  const summary = useRef();
  const description = useRef();
  const start_date = useRef();
  const end_date = useRef();

  const imageInitialState = {
    main_image_url: "",
    thumbnail_image_url: "",
    detail_image_url: "",
  };

  const existingImageState = {
    main_image_url: "",
    thumbnail_image_url: "",
    detail_image_url: "",
  };

  //const [form, setForm] = useState(formIntialState);
  const [newImages, setNewImages] = useState(imageInitialState);
  const [error, setError] = useState({});
  const [existingImage, setExistingImage] = useState(existingImageState);

  useEffect(() => {
    if (storeData) {
      name.current.value = storeData.name || "";
      brand.current.value = storeData.brand || "";
      category.current.value = storeData.category || "";
      address.current.value = storeData.address || "";
      location.current.value = storeData.location || "";
      summary.current.value = storeData.summary || "";
      description.current.value = storeData.description || "";
      start_date.current.value = storeData.start_date || "";
      end_date.current.value = storeData.end_date || "";

      setExistingImage(() => storeData.image);
    }
  }, [storeData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        name: name.current.value,
        brand: brand.current.value,
        category: category.current.value,
        address: address.current.value,
        location: location.current.value,
        summary: summary.current.value,
        description: description.current.value,
        start_date: start_date.current.value,
        end_date: end_date.current.value,
      };

      if (storeId) {
        const newImageUrl = await imageUploader(newImages, existingImage);
        console.log("updated image URLS", newImageUrl);
        const updatedFormData = { ...formData, ...newImageUrl };
        const { data } = await axios.patch(
          `http://localhost:4000/popupStore/${storeId}`,
          updatedFormData
        );
        console.log("store updated", data);
      } else {
        const imageURL = await imageUploader(newImages, false);
        const updatedFormData = { ...formData, ...imageURL };
        const { data } = await axios.post(
          `http://localhost:4000/popupStore`,
          updatedFormData
        );
        console.log("store created", data);
      }
      router.push("/serviceAdmin");
      router.refresh();
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
            <input type="text" name="name" ref={name} />
          </label>
        </div>
        <div>
          <label>
            브랜드 이름:
            <input type="text" name="brand" ref={brand} />
          </label>
        </div>
        <div>
          <label>
            카테고리:
            <input type="text" name="category" ref={category} />
          </label>
        </div>
        <div>
          <label>
            주소:
            <input type="text" name="address" ref={address} />
          </label>
        </div>
        <div>
          <label>
            지역:
            <input type="text" name="location" ref={location} />
          </label>
        </div>
        <div>
          <label>
            소개:
            <input type="text" name="summary" ref={summary} />
          </label>
        </div>
        <div>
          <label>
            설명:
            <input type="text" name="description" ref={description} />
          </label>
        </div>
        <div>
          <label>
            이벤트 시작일:
            <input type="text" name="start_date" ref={start_date} />
          </label>
        </div>
        <div>
          <label>
            이벤트 종료일:
            <input type="text" name="end_date" ref={end_date} />
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
