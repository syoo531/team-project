"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./sidebar.scss";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => (pathname === path ? "active" : "");

  return (
    <div className="sidebar">
      <Link href="/corpAdmin">
        <img
          className="logo"
          src="https://user-images.githubusercontent.com/126956430/282671088-36fecca9-631c-4a3d-a73e-80047a312533.png"
          alt="로고 이미지"
        />
      </Link>
      <ul>
        <li>
          <Link href="/corpAdmin" className={isActive("/corpAdmin")}>
            웨이팅 관리
          </Link>
        </li>
        <li>
          <Link
            href="/corpAdmin/reservation"
            className={isActive("/corpAdmin/reservation")}
          >
            사전예약 관리
          </Link>
        </li>
        <li>
          <Link
            href="/corpAdmin/announcement"
            className={isActive("/corpAdmin/announcement")}
          >
            공지사항
          </Link>
        </li>
      </ul>
    </div>
  );
}
