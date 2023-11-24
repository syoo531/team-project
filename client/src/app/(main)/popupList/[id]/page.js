"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import PopupStore from "../components/popupStore/PopupStore";
import "./page.scss";

export default function PopupList() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  useEffect(() => {});
  return (
    <div className="popupList">
      <div className="popupListBanner"></div>
      <div className="searchResultTitle">{keyword}</div>
      <div className="popupListWrapper">
        <PopupStore />
        <PopupStore />
        <PopupStore />
        <PopupStore />
        <PopupStore />
        <PopupStore />
        <PopupStore />
        <PopupStore />
        <PopupStore />
        <PopupStore />
      </div>
    </div>
  );
}
