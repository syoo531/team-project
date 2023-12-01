"use client";

import "./Search.scss";
import { CATEGORY_OPTIONS } from "../../utils/constants";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "use-debounce";

export default function Search({ userList }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialQueryState = {
    search: "",
    category: "",
    start_date: "",
    end_date: "",
    status: "",
  };

  const [query, setQuery] = useState(initialQueryState);
  const [showDateSelector, setShowDateSelector] = useState(false);
  const [debounce] = useDebounce(query.search, 500);

  //검색시 url 쿼리스트링 업데이트 (router.query가 next/navigation에서 사라져서 URLSearchParams 사용)
  const createQueryString = (query) => {
    const params = new URLSearchParams(searchParams);
    for (const [name, value] of Object.entries(query)) {
      if (value !== "" && value !== undefined) {
        params.set(name, value);
      } else {
        params.delete(name); //값이 비어있으면 제거
      }
    }
    return params.toString();
  };

  useEffect(() => {
    if (userList) {
      router.push(`/serviceAdmin/users?${createQueryString(query)}`);
    } else {
      router.push(`/serviceAdmin/popupstore?${createQueryString(query)}`);
    }
  }, [
    debounce,
    query.category,
    query.start_date,
    query.end_date,
    query.status,
    router,
  ]);

  const handleSearch = (e) => {
    const { name, value } = e.target;
    setQuery((prevQuery) => ({
      ...prevQuery,
      [name]: value,
    }));

    if (name === "start_date" || name === "end_date") {
      setQuery((cur) => ({ ...cur, status: "" }));
    }

    if (name === "status") {
      setQuery((cur) => ({ ...cur, start_date: "", end_date: "" }));
    }
  };

  //검색, 필터 초기화
  const resetFilter = () => {
    setQuery(initialQueryState);
  };

  const toggleDateSelector = () => {
    setShowDateSelector((prev) => !prev);
  };

  return (
    <div className="search__container">
      <div className="search__main-search-container">
        <div className="search-input-container">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon" />
          <div>
            <input
              className="search-input"
              name="search"
              placeholder={userList ? "사용자 이름 검색" : "검색"}
              onChange={handleSearch}
              value={query.search}
            />
          </div>
        </div>
        {userList ? null : (
          <>
            <select
              onChange={handleSearch}
              name="category"
              value={query.category}
            >
              <option value="">전체 카테고리</option>
              {CATEGORY_OPTIONS.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <select onChange={handleSearch} name="status" value={query.status}>
              <option value="">진행상태</option>
              <option value="scheduled">오픈 예정</option>
              <option value="running">진행 중</option>
              <option value="closed">종료</option>
            </select>

            <button className="show-date-button" onClick={toggleDateSelector}>
              기간조회
            </button>
            <button className="reset-button" onClick={resetFilter}>
              초기화
            </button>
          </>
        )}
      </div>

      {showDateSelector && (
        <div className="date-selector-container">
          <span>조회 기간</span>
          <input
            type="date"
            name="start_date"
            onChange={handleSearch}
            value={query.start_date}
          />
          <span>~</span>
          <input
            type="date"
            name="end_date"
            onChange={handleSearch}
            value={query.end_date}
          />
        </div>
      )}
    </div>
  );
}
