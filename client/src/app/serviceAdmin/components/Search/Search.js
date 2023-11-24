"use client";

import "./Search.scss";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { useDebounce } from "use-debounce";

export default function Search() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showFilter, setShowFilter] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [start_date, setStart_Date] = useState("");
  const [end_date, setEnd_Date] = useState("");
  const [debounce] = useDebounce(searchKeyword, 500);

  const createQueryString = (query) => {
    const params = new URLSearchParams(searchParams);
    for (const [name, value] of Object.entries(query)) {
      if (value !== "" && value !== undefined) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
    }
    return params.toString();
  };

  useEffect(() => {
    const query = {
      category: selectedFilter,
      search: searchKeyword,
      start_date,
      end_date,
    };
    router.push(`/serviceAdmin/popupstore?${createQueryString(query)}`);
  }, [debounce, selectedFilter, start_date, end_date, router]);

  const resetFilter = () => {};

  const handleShowFilter = () => {
    setShowFilter((prev) => !prev);
  };

  return (
    <div className="search__container">
      <div className="search__main-search">
        <input
          className="search-input"
          placeholder="검색"
          onChange={(e) => setSearchKeyword(e.target.value)}
          value={searchKeyword}
        />
        <div>
          <button onClick={handleShowFilter}>
            <FontAwesomeIcon icon={faFilter} style={{ color: "#233453" }} />
            검색 필터
          </button>
          <button onClick={resetFilter}>초기화</button>
        </div>
      </div>

      {showFilter && (
        <div className="search__filter">
          <select onChange={(e) => setSelectedFilter(e.target.value)}>
            <option value="">카테고리</option>
            <option value="뷰티">뷰티</option>
            <option value="예술">예술</option>
          </select>

          <input
            placeholder="이벤트 시작 날짜"
            type="date"
            value={start_date}
            onChange={(e) => setStart_Date(e.target.value)}
          />

          <input
            type="date"
            onChange={(e) => setEnd_Date(e.target.value)}
            value={end_date}
          />
        </div>
      )}
    </div>
  );
}
