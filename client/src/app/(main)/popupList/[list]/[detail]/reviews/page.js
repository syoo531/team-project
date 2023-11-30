"use client";
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import instance from "@/utils/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import "./page.scss";

export default function Reviews() {
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const storeID = params.detail; //특정 팝업스토어ID

    const [storeReviews, setStoreReviews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            // 특정 팝업스토어에 대한 리뷰 데이터 가져오기 (최신순으로 데이터 받음)
            const { data } = await instance.get(`review/byPopupstore/${storeID}?${new URLSearchParams(searchParams)}`);

            setStoreReviews(data.reviewData); //특정 팝업스토어 리뷰 데이터
            setTotalPages(data.totalPages); //총 페이지 수
            setCurrentPage(data.currentPage); //현재 페이지 번호
            setLoading(false);
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [searchParams]);

    //paginaion 기능
    const changePage = (pageNum) => {
        if (pageNum > totalPages || pageNum < 1) return;

        const queryString = new URLSearchParams(searchParams);
        queryString.set("page", pageNum);
        router.push(`${pathname}?${queryString.toString()}`);
    };

    //로딩 중일 때 문구 표시
    if (loading) {
        return <div style={{ height: "50vh" }}>로딩중입니다.</div>;
    }

    //리뷰가 없는 경우 없다는 문구 표시
    if (!loading && storeReviews.length === 0) {
        return (
            <div className="popReviewList" style={{ height: "50vh" }}>
                <div className="noReview">리뷰가 아직 없습니다!</div>
            </div>
        );
    }

    return (
        <div className="popReviewList">
            {storeReviews.length > 0 &&
                storeReviews.map((review) => (
                    <div className="popReviewListItem" key={review._id}>
                        <div className="top">
                            <h3>{review.name}</h3>
                            <h4>{review.created_at.split("T")[0]}</h4>
                        </div>
                        <div className="cont">
                            <p>{review.text}</p>
                        </div>

                        {/* 리뷰 이미지가 있는지 확인 후 렌더링 */}
                        {review.image.length > 0 && (
                            <div className="img">
                                {review.image.map((img, i) => (
                                    <img
                                        style={{ width: "200px" }}
                                        key={i}
                                        src={img.url}
                                        alt={`Review Image ${i + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            <div className="pagination__container">
                <FontAwesomeIcon
                    className="arrow-icon"
                    icon={faAngleLeft}
                    onClick={() => changePage(Number(currentPage) - 1)}
                />
                <div className="pageNum">
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
        </div>
    );
}
