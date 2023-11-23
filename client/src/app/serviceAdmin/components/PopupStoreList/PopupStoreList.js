"use client";

import "./PopupStoreList.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAllS3 } from "../imageUploader";
import axios from "axios";

export default function PopupStoreList({ storeData: stores }) {
  const router = useRouter();

  const [selectedStores, setSelectedStores] = useState([]);

  const handleCheckbox = (storeId) => {
    if (selectedStores.includes(storeId)) {
      setSelectedStores((prev) => prev.filter((id) => id !== storeId));
    } else {
      setSelectedStores((prev) => [...prev, storeId]);
    }
  };

  console.log(selectedStores)

  return (
    <div className="main__layout">
      <div className="main__header list__header">
        <div className="main-title">
          <h1>팝업스토어 목록</h1>
        </div>
        <div className="action__menu">
          <button onClick={() => router.push("/serviceAdmin/create")}>
            신규등록!!
          </button>
        </div>
      </div>
      <div className="list__container">
        <table className="list-table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>팝업스토어 이름</th>
              <th>브랜드 이름</th>
              <th>카테고리</th>
              <th>지역</th>
              <th>시작일</th>
              <th>종료일</th>
            </tr>
          </thead>
          <tbody>
            {stores &&
              stores?.map((store) => (
                <tr
                  className="table-row"
                  key={store._id}
                  onClick={() => router.push(`/serviceAdmin/${store._id}`)}
                >
                  <td>
                    <input
                      type="checkbox"
                      value={store._id}
                      onChange={() => {
                        handleCheckbox(store._id);
                      }}
                    />
                  </td>
                  <td>{store.name}</td>
                  <td>{store.brand}</td>
                  <td>{store.category}</td>
                  <td>{store.location}</td>
                  <td>{store.start_date && store?.start_date.split("T")[0]}</td>
                  <td>{store.end_date && store?.start_date.split("T")[0]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
