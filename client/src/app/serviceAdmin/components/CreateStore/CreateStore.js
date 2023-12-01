"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { s3UploadMultipleImages, s3UploadSingleImage } from "../imageUploader";
import Form from "../Form/Form.js";
import instance from "@/utils/instance";

export default function CreateStore() {
  const router = useRouter();

  const formIntialState = {
    name: "",
    brand: "",
    category: "",
    address: "",
    detail_address: "",
    zipcode: "",
    location: "",
    summary: "",
    description: "",
    start_date: "",
    end_date: "",
  };

  const [formData, setFormData] = useState(formIntialState);
  const [newImages, setNewImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  const createPopupStore = async () => {
    try {
      const [imageURL, mainURL] = await Promise.all([
        s3UploadMultipleImages(newImages),
        s3UploadSingleImage(mainImage),
      ]);

      const updatedFormData = { ...formData, imageURL, mainURL };
      await instance.post(`/popupStore`, updatedFormData);
    } catch (err) {
      window.alert("서비스 관리자가 아닙니다.");
    }
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
    if (!mainImage) {
      window.alert("메인 이미지를 업로드해주세요.");
      return;
    }

    setDisableButton(true);

    try {
      await createPopupStore();
      router.push("/serviceAdmin/popupstore");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      setDisableButton(false);
    }
  };

  return (
    <>
      <Form
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newImages={newImages}
        setNewImages={setNewImages}
        mainImage={mainImage}
        setMainImage={setMainImage}
        disableButton={disableButton}
      />
    </>
  );
}
