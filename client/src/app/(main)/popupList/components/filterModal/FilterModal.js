"use client";
import { useState } from "react";
import moment from "moment/moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import Area from "./components/area/Area";
import Category from "./components/category/Category";
import Period from "./components/period/Period";
import "./FilterModal.scss";
import { useRouter } from "next/navigation";

const FILTER_TYPES = [
  { id: 1, typeName: "구역" },
  { id: 2, typeName: "카테고리" },
  { id: 3, typeName: "날짜" },
];

const SELECT_VALUE = {
  area: null,
  category: null,
  date: null,
};

export default function FilterModal({ setFilterModal }) {
  const [currentId, setCurrentId] = useState(1);
  const [selectValue, setSelectValue] = useState(SELECT_VALUE);
  const router = useRouter();

  function filterTypeChange(targetId) {
    setCurrentId(targetId);
  }

  function handleFilter() {
    router.push(
      `/popupList/filter?pageNumber=1&limit=8${
        selectValue.area ? `&area=${selectValue.area}` : ""
      }${selectValue.category ? `&category=${selectValue.category}` : ""}${
        selectValue.date ? `&date=${selectValue.date}` : ""
      }`
    );
    window.document.body.style.overflowY = "scroll";
    setFilterModal(false);
  }

  return (
    <div className="filterModal">
      <div className="filterModalHeader">
        <div className="filterText">필터</div>
        <FontAwesomeIcon
          className="closeBtn"
          icon={faCircleXmark}
          onClick={() => {
            window.document.body.style.overflowY = "scroll";
            setFilterModal(false);
          }}
        />
      </div>
      <div className="filterModalMain">
        <div className="filterNavWrapper">
          <div className="filterNavTitle">필터 유형</div>
          <div className="filterNavSubTitle">
            내가 딱 원하는 팝업스토어를 찾아보세요.
          </div>
          <div className="filterListWrapper">
            {FILTER_TYPES.map((type) => {
              return (
                <div
                  key={type.id}
                  className={`filterType ${
                    currentId === type.id ? "clicked" : null
                  }`}
                  onClick={() => {
                    filterTypeChange(type.id);
                  }}
                >
                  {type.typeName}
                </div>
              );
            })}
          </div>
        </div>

        {currentId === 1 && (
          <Area selectValue={selectValue} setSelectValue={setSelectValue} />
        )}
        {currentId === 2 && (
          <Category selectValue={selectValue} setSelectValue={setSelectValue} />
        )}
        {currentId === 3 && (
          <Period selectValue={selectValue} setSelectValue={setSelectValue} />
        )}
      </div>
      <div className="filterModalFooter">
        <div className="filteringWrapper">
          <div className="filteringTitle">내가 적용한 필터 :</div>
          {selectValue.area && (
            <div className="areaFiltering">
              <div className="appliedText">{selectValue.area}</div>
              <div
                className="removeBtn"
                onClick={() => {
                  setSelectValue({ ...selectValue, area: null });
                }}
              >
                ✕
              </div>
            </div>
          )}
          {selectValue.category && (
            <div className="categoryFiltering">
              <div className="appliedText"> {selectValue.category}</div>
              <div
                className="removeBtn"
                onClick={() => {
                  setSelectValue({ ...selectValue, category: null });
                }}
              >
                ✕
              </div>
            </div>
          )}
          {selectValue.date && (
            <div className="dateFiltering">
              <div className="appliedText">
                {moment(selectValue.date).format("YYYY-MM-DD")}
              </div>
              <div
                className="removeBtn"
                onClick={() => {
                  setSelectValue({ ...selectValue, date: null });
                }}
              >
                ✕
              </div>
            </div>
          )}
        </div>
        <div className="buttonWrapper">
          <div
            className="resetBtn"
            onClick={() => {
              setSelectValue({
                ...selectValue,
                area: null,
                category: null,
                date: null,
              });
            }}
          >
            <FontAwesomeIcon icon={faRotateLeft} /> 초기화
          </div>
          <div className="viewBtn" onClick={handleFilter}>
            적용하기
          </div>
        </div>
      </div>
    </div>
  );
}
