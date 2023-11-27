"use client";

import "./UserDashboard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import {
  faUsers,
  faCalendarDay,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

export default function UserDashboard({ data, totalUsers = 0, newUserToday }) {
  return (
    <div className="dashboard__layout">
      <div className="dashboard__container">
        <div className="dashboard__card">
          <div>
            <p>전체 사용자</p>
            <h4>{totalUsers}명</h4>
          </div>
          <div className="card-icons">
            <FontAwesomeIcon icon={faUsers} />
          </div>
        </div>
        <div className="dashboard__card">
          <div>
            <p>오늘 가입한 사용자 </p>
            <h4>{newUserToday?.length || 0}명</h4>
          </div>
          <div className="card-icons">
            <FontAwesomeIcon icon={faCalendarDay} />
          </div>
        </div>
        {/* 
      <div>새 사용자 수</div>
      <FontAwesomeIcon icon={faCalendarDays} />

      <div>인기 카테고리</div>
      <FontAwesomeIcon icon={faFire} /> */}
      </div>
    </div>
  );
}
