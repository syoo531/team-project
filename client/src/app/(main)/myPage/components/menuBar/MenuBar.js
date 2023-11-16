// 메뉴바
import "./MenuBar.scss";

export default function MenuBar() {
  return (
    <div className="menuContainer">
      <div className="menuText">홈</div>
      <div className="menuText">예약내역</div>
      <div className="menuText">관심리스트</div>
      <div className="menuText">문의하기</div>
      <div className="menuText">문의내역 확인</div>
      <div className="menuText">리뷰관리</div>
      <div className="menuText">회원정보수정</div>
      <div className="menuText">회원탈퇴</div>
    </div>
  );
}
