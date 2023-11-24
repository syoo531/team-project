"use client";

import "./PopupStoreList.scss";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteAllS3 } from "../imageUploader";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import Search from "../Search/Search";

export default function PopupStoreList({ storeData: stores }) {
  const router = useRouter();

  return (
    <div className="main__layout">
      <div className="main__header list__header">
        <div className="main-title">
          <h1>팝업스토어 목록</h1>
        </div>
        <div className="action__menu">
          <button onClick={() => router.push("/serviceAdmin/popupstore/create")}>
            신규등록!!
          </button>
        </div>
      </div>
    
      <div className="list__container">
      <Search />
        <table className="list-table">
          <thead>
            <tr>
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
                  onClick={() => router.push(`/serviceAdmin/popupstore/${store._id}`)}
                >
                  <td>{store.name}</td>
                  <td>{store.brand}</td>
                  <td>{store.category}</td>
                  <td>{store.location}</td>
                  <td>{store.start_date && store?.start_date.split("T")[0]}</td>
                  <td>{store.end_date && store?.end_date.split("T")[0]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
