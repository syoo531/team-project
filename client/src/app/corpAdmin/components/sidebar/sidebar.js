// components/Sidebar.js
import Link from "next/link";
import "./sidebar.scss";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <img
        className="logo"
        src="https://user-images.githubusercontent.com/126956430/282671069-a09c630b-27dd-4089-9cdc-a2117ca9c132.png"
        alt="로고이미지"
      />
      <ul>
        <li>
          <Link href="/corpAdmin">웨이팅 관리</Link>
        </li>
        <li>
          <Link href="">사전예약 관리</Link>
        </li>
        <li>
          <Link href="">공지사항</Link>
        </li>
      </ul>
    </div>
  );
}
