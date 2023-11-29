"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../../../utils/instance";
import PopupStore from "../components/popupStore/PopupStore";
import "./page.scss";

export default function PopupList() {
  const [pages, setPages] = useState([]);
  const [popupStores, setPopupStores] = useState([]);
  const [documents, setDocuments] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get("keyword");
  const areaValue = searchParams.get("area");
  const categoryValue = searchParams.get("category");
  const dateValue = searchParams.get("date");
  const pageNumberValue = searchParams.get("pageNumber");

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
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${pathname}?${searchParams.toString()}`
        );

        if (response.status === 200) {
          const { totalPages, popupStores, documents } = response.data;
          const pages = Array.from(
            { length: totalPages },
            (_, index) => index + 1
          );
          setPopupStores(popupStores);
          setPages(pages);
          setDocuments(documents);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, [pathname, searchParams, pageNumberValue]);

  return (
    <div className="popupList">
      {pathname === "/popupList/all" ? (
        <div className="popupListBanner"></div>
      ) : pathname === "/popupList/search" ? (
        <div className="searchResult">
          '{searchKeyword}' 검색 결과 총 {documents}개의 팝업스토어를
          찾았습니다.
        </div>
      ) : (
        <div className="filterResult">
          {`${areaValue ? `'${areaValue}' ` : ""}${
            categoryValue ? `'${categoryValue}' ` : ""
          }${dateValue ? `'${dateFormat(dateValue)}' ` : ""}`}
          필터링 결과 총 {documents}
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
          {popupStores.map((store) => {
            return <PopupStore key={store._id} store={store} />;
          })}
        </div>
      )}
      <div className="pageNumberWrapper">
        {pages.map((pageNumber) => {
          return (
            <div
              key={pageNumber}
              className={`pageNumber ${
                Number(pageNumberValue) === pageNumber ? "clicked" : null
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
