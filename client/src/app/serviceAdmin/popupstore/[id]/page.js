"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  s3UploadMultipleImages,
  s3UploadSingleImage,
  deleteAllS3,
  deleteImageS3,
} from "../../components/imageUploader";
import instance from "@/utils/instance";
import Form from "../../components/Form/Form";

export default function Page() {
  const router = useRouter();
  const params = useParams();

  const formIntialState = {
    name: "",
    brand: "",
    category: "",
    zipcode: "",
    address: "",
    detail_address: "",
    location: "",
    summary: "",
    description: "",
    start_date: "",
    end_date: "",
    mainImage: "",
  };

  const [formData, setFormData] = useState(formIntialState);
  const [newImages, setNewImages] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [existingImage, setExistingImage] = useState([]);
  const [disableButton, setDisableButton] = useState(false);
  const [error, setError] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          window.alert("권리자 권한이 없습니다");
          router.push("/serviceAdmin/popupstore");
          return;
        }

        const { data } = await instance.get(`/popupstore/${params.id}`);
        if (data) {
          setFormData(() => ({
            name: data.name,
            brand: data.brand,
            category: data.category,
            zipcode: data.zipcode,
            address: data.address,
            detail_address: data.detail_address,
            location: data.location,
            summary: data.summary,
            description: data.description,
            start_date: data.start_date,
            end_date: data.end_date,
            mainImage: data.mainImage,
          }));
          setExistingImage(data?.images);
          setMainImage(data?.mainImage);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  //팝업스토어 업데이트
  const updatePopupStore = async () => {
    let updatedFormData = { ...formData };
    console.log("FIRST UPDATED FORMDATA", updatedFormData);

    try {
      //메인 이미지가 파일인 경우 기존 이미지 삭제 후 새로운 url를 받는다
      if (mainImage instanceof File) {
        const [newMain] = await Promise.all([
          s3UploadSingleImage(mainImage),
          deleteImageS3(formData.mainImage.url),
        ]);
        updatedFormData = { ...updatedFormData, newMain };
      }

      if (newImages.length > 0) {
        console.log("NEW IMAGES IF ");
        const newImageUrl = await s3UploadMultipleImages(newImages);
        updatedFormData = { ...updatedFormData, newImageUrl };
      }

      delete updatedFormData.mainImage;
      console.log("formdata", updatedFormData);
      await instance.patch(`/popupStore/${params.id}`, updatedFormData);
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
        instance.delete(`/popupStore/${params.id}`),
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
        storeId={params.id}
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
