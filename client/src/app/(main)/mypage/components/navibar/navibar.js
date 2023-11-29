"use client";
import "./navibar.scss";

export default function Navibar({ handleMenu, currentContent }) {
  const navibarMenu = [
    "현장대기",
    "사전예약",
    "관심팝업",
    "리뷰관리",
    "회원정보",
    "비밀번호변경",
  ];

  return (
    <div className="navibarContainer">
      <div className="filterNavibarWrapper">
        {navibarMenu.map((v, i) => {
          return (
            <div
              className={
                i === currentContent ? "navibarMenu current" : "navibarMenu"
              }
              key={i}
              onClick={() => handleMenu(i)}
            >
              {v}
            </div>
          );
        })}
      </div>
    </div>
  );
}
