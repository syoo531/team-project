// 메뉴바
import "./ReviewBox.scss";

export default function MenuBar() {
  // const pathname = usePathname();
  return (
    <div className="reviewBoxContainer">
      <div>회원아이디</div>
      <div>리뷰사진</div>
      <div>리뷰내용</div>
      <button>X</button>
    </div>
  );
}
