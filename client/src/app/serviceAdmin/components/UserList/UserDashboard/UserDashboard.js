"use client";

import "./UserDashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faUsers,
  faCalendarDay,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

export default function UserDashboard({
  data,
  totalUsers = 0,
  newUserToday = 0,
}) {
  return (
    <div className="dashboard__container">
      <div>전체 사용자 {totalUsers}명</div>
      <FontAwesomeIcon icon={faUsers} />

      <div>오늘 가입한 사용자 {newUserToday.length}명</div>
      <FontAwesomeIcon icon={faCalendarDay} />
      {/* 
      <div>새 사용자 수</div>
      <FontAwesomeIcon icon={faCalendarDays} />

      <div>인기 카테고리</div>
      <FontAwesomeIcon icon={faFire} /> */}
    </div>
  );
}
