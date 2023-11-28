import "./reviewCard.scss";
import instance from "@/utils/instance";
import { useEffect, useState } from "react";

export default function ReviewCard({ data, onClose }) {
  return (
    <div className="reviewCard">
      <button className="reviewButton" onClick={onClose}>
        X
      </button>
      <div>{data.popup_store.name}</div>
      <div>작성자 이름</div>
      <div>리뷰 내용</div>
    </div>
  );
}
