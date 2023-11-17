import "./mypage.scss";
import MenuBar from "./components/menuBar/MenuBar";
import MyPageHome from "./components/myPageHome/MyPageHome";

// MyPage Path : http://localhost:3000/myPage
export default function MyPage() {
  return (
    <div className="Container">
      <MenuBar />
      <MyPageHome />
      <reservationList />
    </div>
  );
}
