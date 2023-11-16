"use client";

import "./styles.scss"
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const imageInitialState = {
  main_image_url: "",
  thumbnail_image_url: "",
  detail_image_url: "",
};

const StoreForm = () => {
  const router = useRouter();

  const formIntialState = {
    name: storeData?.name || "",
    brand: storeData?.brand || "",
    category: storeData?.category || "",
    address: storeData?.address || "",
    location: storeData?.location || "",
    summary: storeData?.summary || "",
    description: storeData?.description || "",
    start_date: storeData?.start_date || "",
    end_date: storeData?.end_date || "",
  };

  const [form, setForm] = useState(formIntialState);
  const [images, setimages] = useState(imageInitialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(images).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const { data } = await axios.post("/api/s3-upload", formData);
      console.log(data);
      let formWithImage = { ...form, image: data._id };

      const res = await axios.post("/api/serviceAdmin", formWithImage);
      console.log(res.data);
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
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            브랜드 이름:
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            카테고리:
            <input
              type="text"
              name="category"
              value={form.category}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            주소:
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            지역:
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            메인 이미지:
            <input
              type="file"
              name="main_image_url"
              onChange={(e) =>
                setimages((cur) => ({
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
                setimages((cur) => ({
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
                setimages((cur) => ({
                  ...cur,
                  detail_image_url: e.target.files[0],
                }))
              }
            />
          </label>
        </div>
        <div>
          <label>
            소개:
            <input
              type="text"
              name="summary"
              value={form.summary}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            설명:
            <input
              type="text"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            이벤트 시작일:
            <input
              type="text"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            이벤트 종료일:
            <input
              type="text"
              name="end_date"
              value={form.end_date}
              onChange={handleChange}
            />
          </label>
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
