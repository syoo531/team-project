"use client";

import "./CreateStore.scss";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { s3imageUploader, deleteAllS3 } from "../imageUploader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";
import Form from "../Form/Form.js";

const CreateStore = () => {
  const router = useRouter();

  const formIntialState = {
    name: "",
    brand: "",
    category: "",
    address: "",
    location: "",
    summary: "",
    description: "",
    start_date: "",
    end_date: "",
  };

  const imageInitialState = {
    main_image_url: null,
    thumbnail_image_url: null,
    detail_image_url: null,
  };

  const [formData, setFormData] = useState(formIntialState);
  const [newImages, setNewImages] = useState(imageInitialState);
  const [error, setError] = useState({});

  const createPopupStore = async (formData) => {
    const imageURL = await s3imageUploader(newImages, false);
    const updatedFormData = { ...formData, ...imageURL };
    const { data } = await axios.post(
      `http://localhost:4000/api/popupStore`,
      updatedFormData
    );
    console.log("store created", data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPopupStore(formData);
      router.push("/serviceAdmin");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUploadImage = (e) => {
    setNewImages((cur) => ({
      ...cur,
      detail_image_url: e.target.files[0],
    }));
    const objectURL = window.URL.createObjectURL(e.target.files[0]);
  };

  const renderImagePreview = (newImage, existingImage) => {
    return (
      <>
        {newImage || existingImage ? (
          <img
            src={newImage ? URL.createObjectURL(newImage) : existingImage}
            alt="이미지 미리보기"
          />
        ) : null}
      </>
    );
  };

  return (
    <div>
      <Form
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        handleUploadImage={handleUploadImage}
        renderImagePreview={renderImagePreview}
      />
    </div>
  );
};

export default CreateStore;
