"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./sidebar.scss";

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path) => (pathname === path ? "active" : "");

  const links = [
    { href: "/corpAdmin", label: "웨이팅 관리" },
    { href: "/corpAdmin/reservation", label: "사전예약 관리" },
    { href: "", label: "공지사항" },
  ];

  return (
    <div className="sidebar">
      <ul>
        {links.map(({ href, label }) => (
          <li key={label}>
            <Link href={href} className={isActive(href)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
