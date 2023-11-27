"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  s3UploadMultipleImages,
  s3UploadSingleImage,
  deleteAllS3,
  deleteImageS3,
} from "../imageUploader";
import instance from "@/utils/instance";
import Form from "../Form/Form";

export default function UpdateStore({
  storeData,
  detailImg,
  storeId,
  mainImage: img,
}) {
  const router = useRouter();

  const formIntialState = {
    name: storeData?.name || "",
    brand: storeData?.brand || "",
    category: storeData?.category || "",
    zipcode: storeData?.zipcode || "",
    address: storeData?.address || "",
    detail_address: storeData?.detail_address || "",
    location: storeData?.location || "",
    summary: storeData?.summary || "",
    description: storeData?.description || "",
    start_date: storeData?.start_date || "",
    end_date: storeData?.end_date || "",
  };

  const [formData, setFormData] = useState(formIntialState);
  const [newImages, setNewImages] = useState([]);
  const [mainImage, setMainImage] = useState(img);
  const [existingImage, setExistingImage] = useState(detailImg);
  const [disableButton, setDisableButton] = useState(false);
  const [error, setError] = useState({});

  //팝업스토어 업데이트
  const updatePopupStore = async () => {
    let updatedFormData = { ...formData };

    try {
      //메인 이미지가 파일인 경우 기존 이미지 삭제 후 새로운 url를 받는다
      if (mainImage instanceof File) {
        const [newMain] = await Promise.all([
          s3UploadSingleImage(mainImage),
          deleteImageS3(img?.url),
        ]);
        updatedFormData = { ...updatedFormData, newMain };
      }

      if (newImages.length > 0) {
        const newImageUrl = await s3UploadMultipleImages(newImages);
        updatedFormData = { ...updatedFormData, newImageUrl };
      }

      await instance.patch(
        `http://localhost:4000/api/popupStore/${storeId}`,
        updatedFormData
      );
    } catch (error) {
      console.error("Error updating store:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisableButton(true);

    try {
      await updatePopupStore(formData);
      router.push("/serviceAdmin/popupstore");
      router.refresh();
    } catch (error) {
      console.error("Error:", error);
      setDisableButton(false);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("삭제하시겠습니까?");
    if (!confirm) return;

    try {
      //S3와 몽고DB 데이터 삭제
      await Promise.all([
        deleteAllS3(existingImage),
        deleteImageS3(mainImage.url),
        instance.delete(`http://localhost:4000/api/popupStore/${storeId}`),
      ]);
      router.push("/serviceAdmin/popupstore");
      router.refresh();
    } catch (err) {
      console.error(err);
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
    <>
      <Form
        formData={formData}
        setFormData={setFormData}
        storeId={storeId}
        handleChange={handleChange}
        handleDelete={handleDelete}
        handleSubmit={handleSubmit}
        setNewImages={setNewImages}
        newImages={newImages}
        existingImage={existingImage}
        setExistingImage={setExistingImage}
        mainImage={mainImage}
        setMainImage={setMainImage}
        disableButton={disableButton}
      />
    </>
  );
}
