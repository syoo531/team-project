// 회원탈퇴
"use client";
import "./page.scss";
import Link from "next/link";
import MenuBar from "../../components/menuBar/MenuBar";

export default function DeleteUser() {
  return (
    <div className="deleteUserContainer">
      <div>
        <MenuBar />
      </div>
      <div className="deleteUserBox">
        <div>회원탈퇴</div>
        <div>회원탈퇴 하시겠습니까?</div>
        <div>잘못 누르신거겠죠?...</div>
        <Link href="/myPage/deleteUser/checkPassword/submitDeleteUser">예</Link>
        <Link href="/myPage">아니요</Link>
      </div>
    </div>
  );
}
