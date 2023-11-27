"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/searchBar/SearchBar";
import ModalBackGround from "./components/modalBackGround/modalBackGround";
import FilterModal from "./components/filterModal/FilterModal";
import "./Header.scss";

export default function Header() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      setToken(accessToken);
      setLoading(false);
    }
  }, []);

  function openModal() {
    setVisible(true);
    window.document.body.style.overflowY = "hidden";
  }

  function closeModal() {
    setVisible(false);
    window.document.body.style.overflowY = "scroll";
  }

  return (
    <div className="header">
      {visible && <ModalBackGround closeModal={closeModal} />}
      {visible && <FilterModal closeModal={closeModal} />}
      <img
        className="logo"
        src="https://user-images.githubusercontent.com/126956430/282671069-a09c630b-27dd-4089-9cdc-a2117ca9c132.png"
        alt="로고이미지"
        onClick={() => router.push("/")}
      />
      <SearchBar />
      <div className="btnWrapper">
        {loading ? null : !token ? (
          <div
            className="loginBtn"
            onClick={() => {
              router.push("/login");
            }}
          >
            로그인
          </div>
        ) : (
          <div className="myBtn" onClick={() => router.push("/myPage")}>
            마이페이지
          </div>
        )}
        {loading ? null : !token ? (
          <div
            className="signUpBtn"
            onClick={() => {
              router.push("/signup");
            }}
          >
            회원가입
          </div>
        ) : (
          <div
            className="logoutBtn"
            onClick={() => {
              localStorage.removeItem("accessToken");
              setToken(null);
            }}
          >
            로그아웃
          </div>
        )}

        <div className="findBtnWrapper" onClick={openModal}>
          <FontAwesomeIcon className="icon" icon={faSliders} />
          <div className="text">FIND</div>
        </div>
      </div>
    </div>
  );
}
