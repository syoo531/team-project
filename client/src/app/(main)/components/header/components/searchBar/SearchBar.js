"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchModal from "./components/searchModal/SearchModal";
import "./SearchBar.scss";

export default function SearchBar() {
  const [isOpened, setIsOpened] = useState(false);

  function searchModalOpen() {
    window.document.body.style.overflowY = "hidden";
    setIsOpened(true);
  }

  function searchModalClose() {
    window.document.body.style.overflowY = "scroll";
    setIsOpened(false);
  }

  return (
    <div className={`searchBar ${isOpened ? "active" : null}`}>
      {isOpened && (
        <div
          className="blackBackGround"
          onClick={() => {
            searchModalClose();
          }}
        ></div>
      )}
      {isOpened && <SearchModal searchModalClose={searchModalClose} />}
      <label htmlFor="search">
        <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
      </label>
      <input
        id="search"
        placeholder="Search in Pop-Up Store..."
        readOnly
        onClick={searchModalOpen}
      />
    </div>
  );
}
