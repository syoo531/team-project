"use client";
import "./navibar.scss";

export default function Navibar({ handleMenu, currentContent }) {
  const navibarMenu = ["현장대기", "사전예약", "리뷰관리", "회원정보"];

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
