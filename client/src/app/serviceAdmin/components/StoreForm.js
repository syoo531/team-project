"use client";

import "./styles.scss";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { imageUploader } from "./imageUploader";

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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [name]: value,
  //   }));
  // };

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
        console.log(data);
      } else {
        console.log(newImages);
        const imageURL = await imageUploader(newImages, false);
        const updatedFormData = { ...formData, ...imageURL };
        const { data } = await axios.post(
          `http://localhost:4000/popupStore`,
          updatedFormData
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
