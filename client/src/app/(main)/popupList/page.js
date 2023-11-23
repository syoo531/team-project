"use client";
import PopupStore from "./components/popupStore/PopupStore";
import "./page.scss";

export default function PopupList() {
  return (
    <div className="popupList">
      <div className="popupListBanner"></div>
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
