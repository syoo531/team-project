import "./SideMenu.scss";
import Link from "next/link";

export default function SideMenu() {
  return (
    <div className="left-menu__container">

      <div className="left-menu__list">
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
