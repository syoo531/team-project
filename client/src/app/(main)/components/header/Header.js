"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGripVertical } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./components/searchBar/SearchBar";
import "./Header.scss";

export default function Header() {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [infoModal, setInfoModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");
      setToken(accessToken);
      setLoading(false);
    }
  }, []);

  return (
    <div className="header">
      {infoModal && (
        <div className="infoBox">
          {token ? (
            <div
              className="myPageText"
              onClick={() => {
                router.push("/mypage");
                window.scrollTo(0, 0);
                setInfoModal(false);
              }}
            >
              마이페이지
            </div>
          ) : (
            <div
              className="loginText"
              onClick={() => {
                router.push("/login");
                setInfoModal(false);
              }}
            >
              로그인
            </div>
          )}

          {token ? (
            <div
              className="logoutText"
              onClick={() => {
                localStorage.removeItem("accessToken");
                setToken(null);
                setInfoModal(false);
                router.push("/");
              }}
            >
              로그아웃
            </div>
          ) : (
            <div
              className="signupText"
              onClick={() => {
                router.push("/signup");
                setInfoModal(false);
              }}
            >
              회원가입
            </div>
          )}
          <div
            className="closeBtn"
            onClick={() => {
              setInfoModal(false);
            }}
          >
            닫기
          </div>
        </div>
      )}
      <img
        className="logo"
        src="https://user-images.githubusercontent.com/126956430/282671069-a09c630b-27dd-4089-9cdc-a2117ca9c132.png"
        alt="로고이미지"
        onClick={() => router.push("/")}
      />
      <SearchBar isOpened={isOpened} setIsOpened={setIsOpened} />
      <div className="mobileBtnWrapper">
        <FontAwesomeIcon
          className="searchIcon"
          icon={faMagnifyingGlass}
          onClick={() => {
            setIsOpened(true);
          }}
        />
        <FontAwesomeIcon
          className="hamburgerBtn"
          icon={faBars}
          onClick={() => {
            setInfoModal((prev) => !prev);
          }}
        />
      </div>
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
          <div
            className="myBtn"
            onClick={() => {
              router.push("/mypage");
              window.scrollTo(0, 0);
            }}
          >
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
              router.push("/");
            }}
          >
            로그아웃
          </div>
        )}

        <div
          className="findBtnWrapper"
          onClick={() => router.push("/popupList/all?pageNumber=1&limit=8")}
        >
          <FontAwesomeIcon className="icon" icon={faGripVertical} />
          <div className="text">FIND</div>
        </div>
      </div>
    </div>
  );
}
