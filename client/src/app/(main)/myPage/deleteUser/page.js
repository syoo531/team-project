// 회원탈퇴
"use client";
import "./page.scss";
import Link from "next/link";
import MenuBar from "../components/menuBar/MenuBar";

export default function DeleteUser() {
  return (
    <div className="deleteUserContainer">
      <div>
        <MenuBar />
      </div>
      <div className="deleteUserBox">
        <div className="checkBox">
          <div>비밀번호 재확인</div>
          <div>회원 확인을 위해 비밀번호를 다시 입력해주세요.</div>
          <input></input>
          <Link href="/myPage/deleteUser/checkPassword">확인</Link>
        </div>
      </div>
    </div>
  );
}
