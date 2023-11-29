"use client";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CorpAdminSidebar from "./components/corpAdminSidebar/corpAdminSidebar";
import CorpAdminHeader from "./components/corpAdminSidebar/corpAdminHeader";
import "./main.scss";

export default function RootLayout({ children }) {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    function handleResize() {
      const isMobileSize = window.innerWidth <= 768;
      setIsMobileView(isMobileSize);
      if (!isMobileSize && sidebarVisible) {
        setSidebarVisible(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [sidebarVisible]);

  const toggleSidebar = () => {
    if (isMobileView) {
      setSidebarVisible(!sidebarVisible);
    }
  };

  return (
    <div>
      <CorpAdminHeader
        isMobileView={isMobileView}
        toggleSidebar={toggleSidebar}
      />
      <div className="container">
        {(isMobileView ? sidebarVisible : true) && (
          <div
            className={`fullscreenSidebar ${
              isMobileView && sidebarVisible ? "active" : ""
            }`}
          >
            <CorpAdminSidebar />
            <div className="closeIconContainer">
              <FontAwesomeIcon
                icon={faTimes}
                className="closeIcon"
                onClick={() => setSidebarVisible(false)}
              />
            </div>
          </div>
        )}
        <div className="main">
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
}
