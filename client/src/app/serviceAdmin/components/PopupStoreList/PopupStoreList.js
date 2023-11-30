"use client";

import "./PopupStoreList.scss";
import { useRouter } from "next/navigation";
import Search from "../Search/Search";

export default function PopupStoreList({
  storeData: stores = [],
  totalStores = 0,
}) {
  const router = useRouter();

  return (
    <div className="main__layout">
      <div className="main__header list__header">
        <div className="main-title">
          <h1>팝업스토어 목록</h1>
        </div>
        <div className="action__menu">
          <button
            className="create-store-btn"
            onClick={() => router.push("/serviceAdmin/popupstore/create")}
          >
            팝업스토어 등록
          </button>
        </div>
      </div>
      <div className="list__container">
        <Search />
        <p className="list__total">조회 결과: 총 {totalStores}개</p>
        <table className="list-table">
          <thead>
            <tr>
              <th className="store-name-col">팝업스토어 이름</th>
              <th className="brand-name-col">브랜드 이름</th>
              <th>카테고리</th>
              <th>지역</th>
              <th>시작일</th>
              <th>종료일</th>
            </tr>
          </thead>
          <tbody>
            {stores && stores.length > 0 ? (
              stores?.map((store) => (
                <tr
                  className="table-row store-list"
                  key={store._id}
                  onClick={() =>
                    router.push(`/serviceAdmin/popupstore/${store._id}`)
                  }
                >
                  <td>{store.name}</td>
                  <td>{store.brand}</td>
                  <td>{store.category}</td>
                  <td>{store.location}</td>
                  <td>{store.start_date && store?.start_date.split("T")[0]}</td>
                  <td>{store.end_date && store?.end_date.split("T")[0]}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">데이터가 없습니다.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
