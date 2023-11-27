"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
import "./Pagination.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

export default function Pagination({ totalPages, currentPage }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const updateQueryString = (pageNum) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNum);
    return params.toString();
  };

  const changePage = (pageNum) => {
    if (pageNum > totalPages || pageNum < 1) return;

    const queryString = updateQueryString(pageNum);
    router.push(`${pathname}?${queryString}`);
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
