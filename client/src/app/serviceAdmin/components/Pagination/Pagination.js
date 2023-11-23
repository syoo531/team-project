"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import "./Pagination.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function Pagination({ totalPages, currentPage }) {
  const router = useRouter();

  const changePage = (pageNum) => {
    if (pageNum > totalPages || pageNum == 0) return;
    router.push(`/serviceAdmin?page=${pageNum}`);
  };

  return (
    <div className="pagination__container">
      <FontAwesomeIcon
        className="arrow-icon"
        icon={faAngleLeft}
        onClick={() => changePage(Number(currentPage) - 1)}
      />
      <div>
        {Array(totalPages)
          .fill()
          .map((_, i) => (
            <button
              key={i + 1}
              onClick={() => changePage(i + 1)}
              className={i + 1 == currentPage ? "active" : ""}
            >
              {i + 1}
            </button>
          ))}
      </div>
      <FontAwesomeIcon
        className="arrow-icon"
        icon={faAngleRight}
        onClick={() => changePage(Number(currentPage) + 1)}
      />
    </div>
  );
}
