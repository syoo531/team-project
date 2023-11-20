// 메뉴바
"use client";
import "./MenuBar.scss";
import Link from "next/link";
// import { usePathname } from "next/navigation";

export default function MenuBar() {
  // const pathname = usePathname();
  return (
    <div className="menuContainer">
      <Link href="/myPage">홈</Link>
      <Link href="/myPage/reservationList">예약내역</Link>
      <Link href="/myPage/reviewManage">리뷰관리</Link>
      <a className="menuText">문의하기</a>
      <a className="menuText">문의내역 확인</a>
      <Link href="/myPage/updateUserInfo">회원정보수정</Link>
      <Link href="/myPage/deleteUser">회원탈퇴</Link>
    </div>
  );
}
