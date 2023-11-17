import "./mypage.scss";
import MyPageHome from "./components/myPageHome/MyPageHome";
import ReservationList from "./components/reservationList/ReservationList";

// MyPage Path : http://localhost:3000/myPage
export default function MyPage() {
  return (
    <div className="Container">
      <MyPageHome />
      <ReservationList />
    </div>
  );
}
