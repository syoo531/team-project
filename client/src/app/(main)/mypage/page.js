"use client";
import "./page.scss";
import Navibar from "./components/navibar/navibar";
import Waiting from "./components/waiting/waiting";
import Reservation from "./components/reservation/reservation";
import Interest from "./components/myInterest/myInterest";
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
            <Waiting />
          ) : currentContent === 1 ? (
            <Reservation />
          ) : currentContent === 2 ? (
            <Interest />
          ) : currentContent === 3 ? (
            <Review />
          ) : currentContent === 4 ? (
            <UserInfo />
          ) : currentContent === 5 ? (
            <ChangePassword />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
