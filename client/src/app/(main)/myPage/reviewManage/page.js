// 리뷰 관리
import "./page.scss";
import MenuBar from "../components/menuBar/MenuBar";
import ReviewBox from "../components/reviewBox/ReviewBox";

export default function ReviewManage() {
  return (
    <div>
      <MenuBar />
      <ReviewBox />
      <ReviewBox />
      <ReviewBox />
      <ReviewBox />
    </div>
  );
}
