// 리뷰 관리
import "./page.scss";
import MenuBar from "../components/menuBar/MenuBar";
import ReviewBox from "../components/reviewBox/ReviewBox";

export default function ReviewManage() {
  return (
    <div className="reviewManageContainer">
      <div>
        <MenuBar />
      </div>
      <div className="reviewManageBox">
        <div className="reviewManageTitle">OOO님의 리뷰내역</div>
        <ReviewBox />
        <ReviewBox />
        <ReviewBox />
        <ReviewBox />
      </div>
    </div>
  );
}
