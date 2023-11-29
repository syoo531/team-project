// 유저 프로필
"use client";
import "./UserProfile.scss";
import React from "react";
import Link from "next/link";

export default function UserInfo() {
  return (
    <div className="reviewBoxContainer">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      />
      <div className="userInfoButton">
        <div>OOO님</div>
        <Link href="/myPage/updateUserInfo">
          <span class="material-icons">chevron_right</span>
        </Link>
      </div>
      <button className="logOutButton">로그아웃</button>
    </div>
  );
}
