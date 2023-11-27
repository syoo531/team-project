"use client";
import "./page.scss";
import Navibar from "./components/navibar/navibar";
import Waiting from "./components/waiting/waiting";
import Reservation from "./components/reservation/reservation";
import Review from "./components/review/review";
import UserInfo from "./components/userInfo/userInfo";
import ChangePassword from "./components/changePassword/changePassword";
import { useState } from "react";

export default function MyPage() {
  const [currentContent, setCurrentContent] = useState(0);

  const handleMenu = (idx) => {
    setCurrentContent(idx);
  };

  return (
    <div className="mypageContainer">
      <Navibar handleMenu={handleMenu} currentContent={currentContent} />
      <div className="mypageContent">
        <div className="contentWrapper">
          {currentContent === 0 ? (
            ""
          ) : currentContent === 1 ? (
            <Reservation />
          ) : currentContent === 2 ? (
            <Review />
          ) : currentContent === 3 ? (
            <UserInfo />
          ) : currentContent === 4 ? (
            <ChangePassword />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
