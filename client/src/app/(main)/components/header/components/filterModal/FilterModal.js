"use client";
import { useState } from "react";
import ApplyFilter from "./components/applyFilter/ApplyFilter";
import Area from "./components/area/Area";
import Category from "./components/category/Category";
import Period from "./components/period/Period";
import "./FilterModal.scss";

const FILTER_TYPES = [
  { id: 1, typeName: "Area" },
  { id: 2, typeName: "Category" },
  { id: 3, typeName: "Period" },
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
      <div className="filterNavigation">
        {FILTER_TYPES.map((type) => {
          return (
            <div
              key={type.id}
              className="filterTypeWrapper"
              onClick={() => {
                handleChange(type.id);
              }}
            >
              <div
                className={`dotText ${
                  currentId === type.id ? "clicked" : null
                }`}
              >
                •
              </div>
              <div
                key={type.id}
                className={`typeText ${
                  currentId === type.id ? "clicked" : null
                }`}
              >
                {type.typeName}
              </div>
            </div>
          );
        })}
        <div className="filterTitle">어떤 주제에 관심 있어요?</div>
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
      <ApplyFilter
        areaSelectList={areaSelectList}
        handleAreaSelect={handleAreaSelect}
        categorySelectList={categorySelectList}
        handleCategorySelect={handleCategorySelect}
        closeModal={closeModal}
      />
    </div>
  );
}
