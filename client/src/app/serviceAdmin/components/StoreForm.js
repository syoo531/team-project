"use client";

import "./styles.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { imageUploader } from "./imageUploader";

const StoreForm = ({ storeData, storeId }) => {
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
    main_image_url: "",
    thumbnail_image_url: "",
    detail_image_url: "",
  };

  const existingImageState = {
    main_image_url: storeData?.image?.main_image_url || null,
    thumbnail_image_url: storeData?.image?.thumbnail_image_url || null,
    detail_image_url: storeData?.image?.detail_image_url || null,
  };

  const [form, setForm] = useState(formIntialState);
  const [newImages, setNewImages] = useState(imageInitialState);
  const [error, setError] = useState({});
  const [existingImage, setExistingImage] = useState(existingImageState);

  // const client = new S3Client({
  //   region: "ap-southeast-2",
  //   credentials: {
  //     secretAccessKey: "Dxk4x3wV68vNRsvMlP2Ot/q4qI1PDC38M2bo/M9r",
  //     accessKeyId: "AKIARFBUMILQ6S3M63MX",
  //   },
  // });

  // const imageUploader = async () => {
  //   let imageURL = {};
  //   for (const [image, file] of Object.entries(images)) {
  //     if (!file) continue;

  //     const Key = `${Date.now()}-${image}`;
  //     const command = new PutObjectCommand({
  //       Bucket: "mybucket-elice",
  //       Key,
  //       Body: file,
  //       ContentType: file.type,
  //     });
  //     await client.send(command);

  //     if (storeId) await deleteImageS3(showImages[image]);
  //     console.log("image to delete", showImages[image]);

  //     imageURL = {
  //       ...imageURL,
  //       [image]: `https://mybucket-elice.s3.ap-southeast-2.amazonaws.com/${Key}`,
  //     };
  //   }
  //   return imageURL;
  // };

  // const deleteImageS3 = async (imageUrl) => {
  //   console.log("url to delete", imageUrl);
  //   const input = {
  //     Bucket: "mybucket-elice",
  //     Key: imageUrl.split("/").pop().toString(),
  //   };
  //   const command = new DeleteObjectCommand(input);
  //   const response = await client.send(command);
  //   console.log("delete response from s3", response);
  //   return response;
  // };

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
      if (storeId) {
        const newImageUrl = await imageUploader(newImages, existingImage);
        console.log("updated image URLS", newImageUrl);
        const formData = { ...form, ...newImageUrl };
        const { data } = await axios.patch(
          `http://localhost:4000/popupStore/${storeId}`,
          formData
        );
        console.log(data);
      } else {
        const imageURL = await imageUploader(newImages);
        const formData = { ...form, ...imageURL };
        const { data } = await axios.post(
          `http://localhost:4000/popupStore`,
          formData
        );
        console.log("res from server", data);
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
        <div>
          <img style={{ width: "200px" }} src={existingImage.main_image_url} />
          <img
            style={{ width: "200px" }}
            src={existingImage.thumbnail_image_url}
          />
          <img style={{ width: "200px" }} src={existingImage.detail_image_url} />
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
