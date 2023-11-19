import "./NavBar.scss";
import Link from "next/link";

export default function NavBar() {
  return (
    <div className="nav__container">
      <div>로고 넣기</div>

      <div className="nav__menu-list">
        <ul>
          <li>
            <Link href="/serviceAdmin">
              <div className="icon">i</div>
              <span>업체관리</span>
            </Link>
          </li>
          <li>
            <Link href="/User">
              <div className="icon">i</div>
              <span>사용자 관리</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
