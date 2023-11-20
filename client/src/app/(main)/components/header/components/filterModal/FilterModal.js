"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import ApplyFilter from "./components/applyFilter/ApplyFilter";
import Area from "./components/area/Area";
import Category from "./components/category/Category";
import Period from "./components/period/Period";
import "./FilterModal.scss";

const FILTER_TYPES = [
  { id: 1, typeName: "구역" },
  { id: 2, typeName: "카테고리" },
  { id: 3, typeName: "방문날짜" },
];

export default function FilterModal({ closeModal }) {
  const [currentId, setCurrentId] = useState(1);
  const [areaSelectList, setAreaSelectList] = useState([]);
  const [categorySelectList, setCategorySelectList] = useState([]);

  function handleChange(targetId) {
    setCurrentId(targetId);
  }

  function handleAreaSelect(selectArea) {
    if (areaSelectList.includes(selectArea)) {
      setAreaSelectList(areaSelectList.filter((area) => area !== selectArea));
      return;
    }
    setAreaSelectList([...areaSelectList, selectArea]);
  }

  function handleCategorySelect(selectCategory) {
    if (categorySelectList.includes(selectCategory)) {
      setCategorySelectList(
        categorySelectList.filter((category) => category !== selectCategory)
      );
      return;
    }
    setCategorySelectList([...categorySelectList, selectCategory]);
  }

  return (
    <div className="filterModal">
      <div className="filterModalHeader">
        <div className="filterText">필터</div>
        <FontAwesomeIcon
          className="closeBtn"
          icon={faCircleXmark}
          onClick={() => {
            closeModal();
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
                    handleChange(type.id);
                  }}
                >
                  {type.typeName}
                </div>
              );
            })}
          </div>
        </div>

        {currentId === 1 && (
          <Area
            areaSelectList={areaSelectList}
            handleAreaSelect={handleAreaSelect}
          />
        )}
        {currentId === 2 && (
          <Category
            categorySelectList={categorySelectList}
            handleCategorySelect={handleCategorySelect}
          />
        )}
        {currentId === 3 && <Period />}
        {/* <ApplyFilter
        areaSelectList={areaSelectList}
        handleAreaSelect={handleAreaSelect}
        categorySelectList={categorySelectList}
        handleCategorySelect={handleCategorySelect}
        closeModal={closeModal}
      /> */}
      </div>
      <div className="filterModalFooter"></div>
    </div>
  );
}
