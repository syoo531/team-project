// 마이페이지
import "./MyPageHome.scss";
import Link from "next/link";

export default function MyPageHome() {
  return (
    <div className="menuMainContainer">
      <div className="menuContainer">
        <div className="menuText">
          <Link href="/">홈</Link>
        </div>
        <div className="menuText">
          <Link href="/reservationList">예약내역</Link>
        </div>
        <div className="menuText">관심리스트</div>
        <div className="menuText">문의하기</div>
        <div className="menuText">문의내역 확인</div>
        <div className="menuText">리뷰관리</div>
        <div className="menuText">회원정보수정</div>
        <div className="menuText">예약내역</div>
      </div>
      <div className="mainContainer">
        <div className="waitingReviewContainer">
          <div className="waitingContainer">
            <div>팝업스토어 웨이팅</div>
          </div>
          <div className="reviewContainer">
            <div>실시간 베스트 리뷰</div>
          </div>
        </div>

        <div className="favPopUpStore">
          <div>관심 팝업스토어 ❤️</div>
        </div>
      </div>
    </div>
  );
}
