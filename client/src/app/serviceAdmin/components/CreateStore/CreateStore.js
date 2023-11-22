"use client";

import "./CreateStore.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { s3imageUploader } from "../imageUploader";
import axios from "axios";
import Form from "../Form/Form.js";

export default function CreateStore() {
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

  return (
    <div>
      <Form
        formData={formData}
        handleChange={handleChange}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
        setNewImages={setNewImages}
        newImages={newImages}
      />
    </div>
  );
}
