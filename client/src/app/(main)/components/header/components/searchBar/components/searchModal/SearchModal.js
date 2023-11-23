import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchModal.scss";

const RESENT = ["쌍쌍바", "뉴진스", "성수"];
const POPULAR = [
  "캡슐토이",
  "테디베어",
  "싱가포르",
  "선양소주",
  "신선놀음",
  "쥬라기",
  "노티드",
  "푸바오",
  "경기로운랜드",
  "T1",
];

export default function SearchModal({ setSearchValue, searchModalClose }) {
  return (
    <div className="searchModal">
      <div className="inputWrapper">
        <label htmlFor="search">
          <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
        </label>
        <input
          id="search"
          className="searchInput"
          placeholder="검색하실 내용을 입력해주세요."
        />
      </div>
      {/* <div className="resentWrapper">
        <div className="resentTitle">최근 검색어</div>
        <div className="recentSearchList">
          {RESENT.map((search, index) => {
            return (
              <div key={index} className="recentSearch">
                # {search}
              </div>
            );
          })}
        </div>
      </div>
      <div className="popularWrapper">
        <div className="popularTitle">실시간 인기 검색어</div>
        <div className="popularSearchList">
          {POPULAR.map((search, index) => {
            return (
              <div key={index} className="popularSearch">
                {index + 1}. {search}
              </div>
            );
          })}
        </div>
      </div>
      <FontAwesomeIcon
        className="closeBtn"
        icon={faCircleXmark}
        onClick={() => {
          searchModalClose();
        }}
      /> */}
    </div>
  );
}
