"use client";

import "./UpdateStore.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { s3imageUploader, deleteAllS3 } from "../imageUploader";
import axios from "axios";
import Form from "../Form/Form";

export default function UpdateStore({ storeData, image, storeId }) {
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

  const imageInitialState = {
    main_image_url: null,
    thumbnail_image_url: null,
    detail_image_url: null,
  };

  const existingImageState = {
    main_image_url: image?.main_image_url || "",
    thumbnail_image_url: image?.thumbnail_image_url || "",
    detail_image_url: image?.detail_image_url || "",
  };

  const [formData, setFormData] = useState(formIntialState);
  const [newImages, setNewImages] = useState(imageInitialState);
  const [error, setError] = useState({});
  const [existingImage, setExistingImage] = useState(existingImageState);

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
      await updatePopupStore(formData);
      router.push("/serviceAdmin");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const result = window.confirm("삭제하시겠습니까?");
      if (!result) return;

      const {
        data: { image },
      } = await axios.get(`http://localhost:4000/api/popupStore/${storeId}`);

      const imageArray = [
        image.main_image_url,
        image.thumbnail_image_url,
        image.detail_image_url,
      ].filter((v) => v !== undefined && v !== null);

      //S3와 몽고DB 데이터 한번에 삭제
      const res = await Promise.all([
        deleteAllS3(imageArray),
        axios.delete(`http://localhost:4000/api/popupStore/${storeId}`),
      ]);
      console.log(res);
      router.push("/serviceAdmin");
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  return (
    <div>
      <Form
        formData={formData}
        setFormData={setFormData}
        image={image}
        storeId={storeId}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        setNewImages={setNewImages}
        newImages={newImages}
        existingImage={existingImage}
        setExistingImage={setExistingImage}
      />
    </div>
  );
}
