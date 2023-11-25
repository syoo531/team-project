"use client";

import Link from "next/link";
import Sidebar from "@/adminStyles/sidebar/sidebar";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faStore } from "@fortawesome/free-solid-svg-icons";

export default function ServiceAdminSidebar() {
  const links = [
    {
      href: "/serviceAdmin/popupstore",
      label: "팝업스토어 관리",
      icon: <FontAwesomeIcon icon={faStore} />,
    },
    {
      href: "/serviceAdmin/users",
      label: "사용자 관리",
      icon: <FontAwesomeIcon icon={faUser} />,
    },
  ];

  const pathname = usePathname();
  const isActive = (path) => (pathname === path ? "active" : "");

  const sidebarContent = (
    <ul>
      {links.map(({ href, label, icon }) => (
        <li key={label}>
          <Link href={href} className={isActive(href)}>
            {icon} {label}
          </Link>
        </li>
      ))}
    </ul>
  );
  return <Sidebar sidebarContent={sidebarContent} />;
}
