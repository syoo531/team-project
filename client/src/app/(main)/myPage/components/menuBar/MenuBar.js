// 메뉴바
"use client";
import "./MenuBar.scss";
import Link from "next/link";
// import { usePathname } from "next/navigation";

export default function MenuBar() {
  // const pathname = usePathname();
  return (
    <div className="menuContainer">
      <li>
        <Link href="/myPage">홈</Link>
      </li>
      <li>
        <Link href="/myPage/reservationList">예약내역</Link>
      </li>
      <div className="menuText">문의하기</div>
      <div className="menuText">문의내역 확인</div>
      <div className="menuText">리뷰관리</div>
      <div className="menuText">회원정보수정</div>
      <div className="menuText">회원탈퇴</div>
    </div>
  );
}
