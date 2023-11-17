"use client";

import "./PopupStoreList.scss";
//import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteAllS3 } from "../imageUploader";
import axios from "axios";

export default function PopupStoreList({ storeData: stores }) {
  const router = useRouter();
  //const [stores, setStores] = useState([]);

  // const getAllPopupStore = async () => {
  //   const { data } = await axios.get("/api/serviceAdmin");
  //   console.log(data);
  //   setStores(data);
  // };

  // useEffect(() => {
  //   getAllPopupStore();
  // }, []);

  const handleDelete = async (id) => {
    try {
      const {
        data: { image },
      } = await axios.get(`http://localhost:4000/popupStore/${id}`);

      const imageArray = [
        image.main_image_url,
        image.thumbnail_image_url,
        image.detail_image_url,
      ].filter((v) => v !== undefined && v !== null);

      //S3와 몽고DB 데이터 한번에 삭제
      const res = await Promise.all([
        deleteAllS3(imageArray),
        axios.delete(`http://localhost:4000/popupStore/${id}`),
      ]);
      console.log(res);
      router.refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>팝업스토어 목록</h1>
      <button onClick={() => router.push("/serviceAdmin/form")}>
        신규등록!!
      </button>
      <hr></hr>
      <table className="borderTable">
        <thead>
          <tr>
            <th>팝업스토어 이름</th>
            <th>브랜드 이름</th>
            <th>카테고리</th>
            <th>주소</th>
            <th>지역</th>
            <th>시작일</th>
            <th>종료일</th>
            <th>기능</th>
          </tr>
        </thead>
        <tbody>
          {stores &&
            stores?.map((store) => (
              <tr key={store._id}>
                <td>{store.name}</td>
                <td>{store.brand}</td>
                <td>{store.category}</td>
                <td>{store.address}</td>
                <td>{store.location}</td>
                <td>{store.start_date}</td>
                <td>{store.end_date}</td>
                <td>
                  <button
                    onClick={() => router.push(`/serviceAdmin/${store._id}`)}
                  >
                    수정
                  </button>
                  <button onClick={() => handleDelete(store._id)}>삭제</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
