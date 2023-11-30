"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import SearchModal from "./components/searchModal/SearchModal";
import "./SearchBar.scss";

export default function SearchBar({ isOpened, setIsOpened }) {
  function searchModalOpen() {
    window.document.body.style.overflowY = "hidden";
    setIsOpened(true);
  }

  function searchModalClose() {
    window.document.body.style.overflowY = "scroll";
    setIsOpened(false);
  }

  return (
    <div className="searchBarContainer">
      {isOpened && <SearchModal searchModalClose={searchModalClose} />}
      {isOpened && (
        <div
          className="blackBackGround"
          onClick={() => {
            searchModalClose();
          }}
        ></div>
      )}
      <div className={`searchBar ${isOpened ? "active" : null}`}>
        <label htmlFor="search">
          <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
        </label>
        <input
          id="search"
          placeholder="검색하실 키워드를 입력해주세요."
          readOnly
          onClick={searchModalOpen}
        />
      </div>
    </div>
  );
}
