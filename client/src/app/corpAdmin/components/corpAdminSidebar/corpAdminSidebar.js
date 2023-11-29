"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {
  faCalendarCheck,
  faHourglassHalf,
  faRectangleList,
} from "@fortawesome/free-regular-svg-icons";
import Sidebar from "@/adminStyles/sidebar/sidebar";

export default function CorpAdminSidebar({ setSidebarVisible, isMobileView }) {
  const links = [
    {
      href: "/corpAdmin",
      label: "전체 목록",
      icon: <FontAwesomeIcon icon={faRectangleList} />,
    },
    {
      href: "/corpAdmin/corpAdminWaitingList",
      label: "웨이팅 관리",
      icon: <FontAwesomeIcon icon={faHourglassHalf} />,
    },
    {
      href: "/corpAdmin/corpAdminReservations",
      label: "사전예약 관리",
      icon: <FontAwesomeIcon icon={faCalendarCheck} />,
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
