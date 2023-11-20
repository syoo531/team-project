import "./mypage.scss";
import MyPageHome from "./myPageHome/page";
import ReservationList from "./reservationList/page";

// MyPage Path : http://localhost:3000/myPage
export default function MyPage() {
  return (
    <div className="Container">
      <MyPageHome />
    </div>
  );
}
