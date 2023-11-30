"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../../../../../utils/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "./SearchModal.scss";

export default function SearchModal({ searchModalClose }) {
  const recentSearches =
    JSON.parse(localStorage.getItem("recentSearches")) || [];
  const [searchValue, setSearchValue] = useState("");
  const [recentSearchList, setRecentSearchList] = useState(recentSearches);
  const [popularKeywords, setPopularKeywords] = useState([]);
  const router = useRouter();

  function handleChange(e) {
    setSearchValue(e.target.value);
  }

  function dateFormat(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`.slice(2);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!searchValue) {
      return;
    }

    const check = recentSearches.some(
      (keyword) => keyword.word === searchValue,
    );

    if (check) {
      const index = recentSearches.findIndex(
        (keyword) => keyword.word === searchValue,
      );
      recentSearches.splice(index, 1);
      recentSearches.unshift({
        word: searchValue,
        date: dateFormat(new Date()),
      });
    }

    if (!check) {
      recentSearches.unshift({
        word: searchValue,
        date: dateFormat(new Date()),
      });
    }
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    router.push(
      `/popupList/search?pageNumber=1&limit=8&keyword=${searchValue}`,
    );
    setRecentSearchList([...recentSearches]);
    searchModalClose();

    try {
      const response = await axios.post("/search", {
        keyword: searchValue,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  function removeRecentSearchWord(targetId) {
    if (targetId === undefined) {
      recentSearches.splice(0);
    }
    recentSearches.splice(targetId, 1);
    localStorage.setItem("recentSearches", JSON.stringify(recentSearches));
    setRecentSearchList([...recentSearches]);
  }

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("/search");
        if (response.status === 200) {
          setPopularKeywords(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="searchModal" onSubmit={handleSubmit}>
      <form className="inputWrapper">
        <input
          className="searchInput"
          placeholder="검색하실 키워드를 입력해주세요."
          value={searchValue}
          onChange={handleChange}
        />
        <button className="searchBtn">
          <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
          <div className="searchText">검색</div>
        </button>
      </form>
      <div className="searchWordWrapper">
        <div className="recentSearchWordWrapper">
          <div className="recentSearchWordHeader">
            <div className="recentSearchWordTitle">최근 검색어</div>
            <div
              className="allRemoveBtn"
              onClick={() => {
                removeRecentSearchWord();
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} /> 비우기
            </div>
          </div>
          <div className="recentSearchWordList">
            {recentSearchList.slice(0, 7).map((word, index) => {
              return (
                <div key={index} className="recentSearchWord">
                  <div
                    className="searchWord"
                    onClick={() => {
                      router.push(
                        `/popupList/search?pageNumber=1&limit=8&keyword=${word.word}`,
                      );
                      searchModalClose();
                    }}
                  >
                    {word.word}
                  </div>
                  <div className="dateBtnWrapper">
                    <div className="searchDate">{word.date}</div>
                    <div
                      className="removeBtn"
                      onClick={() => {
                        removeRecentSearchWord(index);
                      }}
                    >
                      ✕
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="popularSearchWordWrapper">
          <div className="popularSearchWordTitle">실시간 인기 검색어</div>
          <div className="popularSearchWordList">
            {popularKeywords.slice(0, 14).map((search) => {
              return (
                <div
                  key={search._id}
                  className="popularSearchWord"
                  onClick={() => {
                    router.push(
                      `/popupList/search?pageNumber=1&limit=8&keyword=${search.keyword}`,
                    );
                    searchModalClose();
                  }}
                >
                  # {search.keyword}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <FontAwesomeIcon
        className="closeBtn"
        icon={faCircleXmark}
        onClick={() => {
          searchModalClose();
        }}
      />
    </div>
  );
}
