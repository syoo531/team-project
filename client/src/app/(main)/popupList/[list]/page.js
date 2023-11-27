"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../../../utils/instance";
import PopupStore from "../components/popupStore/PopupStore";
import "./page.scss";

export default function PopupList() {
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [popupStores, setPopupStores] = useState([]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("keyword");
  const areaValue = searchParams.get("area");
  const categoryValue = searchParams.get("category");
  const dateValue = searchParams.get("date");

  function dateFormat(date) {
    const selectDate = new Date(date);
    const year = selectDate.getFullYear();
    const month = selectDate.getMonth() + 1;
    const day = selectDate.getDate();
    return `${year}-${month}-${day}`;
  }

  function changePage(currentPage) {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.set("pageNumber", currentPage);
    const queryString = queryParams.toString();
    router.push(`${pathname}?${queryString}`);
    setCurrentPage(currentPage);
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${pathname}?${searchParams.toString()}`
        );

        if (response.status === 200) {
          const { totalPages, popupStores } = response.data;
          const pages = Array.from(
            { length: totalPages },
            (_, index) => index + 1
          );
          setPopupStores(popupStores);
          setPages(pages);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [searchKeyword, areaValue, categoryValue, dateValue]);

  return (
    <div className="popupList">
      {pathname === "/popupList/all" ? (
        <div className="popupListBanner"></div>
      ) : pathname === "/popupList/search" ? (
        <div className="searchResult">
          '{searchKeyword}' 검색 결과 총 {popupStores.length}개의 팝업스토어를
          찾았습니다.
        </div>
      ) : (
        <div className="filterResult">
          {`${areaValue ? `'${areaValue}' ` : ""}${
            categoryValue ? `'${categoryValue}' ` : ""
          }${dateValue ? `'${dateFormat(dateValue)}' ` : ""}`}
          필터링 결과 총 {popupStores.length}
          개의 팝업스토어를 찾았습니다.
        </div>
      )}
      <div className="btnWrapper">
        <div
          className="allViewBtn"
          onClick={() => {
            router.push("/popupList/all?pageNumber=1&limit=8");
          }}
        >
          ALL VIEW
        </div>
      </div>
      {popupStores.length === 0 ? (
        <div className="notice">
          다른 검색어로 검색하거나 필터를 다시 설정해보세요.
        </div>
      ) : (
        <div className="popupListWrapper">
          <PopupStore />
          <PopupStore />
          <PopupStore />
          <PopupStore />
          <PopupStore />
          <PopupStore />
          <PopupStore />
          <PopupStore />
          <PopupStore />
          <PopupStore />
        </div>
      )}
      <div className="pageNumberWrapper">
        {pages.map((pageNumber, index) => {
          return (
            <div
              key={index}
              className={`pageNumber ${
                currentPage === pageNumber ? "clicked" : null
              }`}
              onClick={() => {
                changePage(pageNumber);
              }}
            >
              {pageNumber}
            </div>
          );
        })}
      </div>
    </div>
  );
}
