"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReviewModal from "./components/reviewModal/reviewModal";
import ReservationModal from "./components/reservationModal/reservationModal";
import WaitingModal from "./components/waitingModal/waitingModal"; // 추가된 부분
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import instance from "@/utils/instance";
config.autoAddCss = false;
import Link from "next/link";
import "./page.scss";

// 팝업스토어 상세 페이지
export default function PopUp(props) {
    const [popupData, setPopupData] = useState({});
    const [reviewData, setReviewData] = useState([]);
    const [reviewModalOpen, setReviewModalOpen] = useState(false);
    const [reservationModalOpen, setReservationModalOpen] = useState(false);
    const [waitingModalOpen, setWaitingModalOpen] = useState(false); // 추가된 부분
    const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);
    const [isReservationCompleted, setIsReservationCompleted] = useState(false); // 사전예약 했는지 안했는지 판단하기위한
    const [isWaitingCompleted, setIsWaitingCompleted] = useState(false); // 사전예약 했는지 안했는지 판단하기위한
    const router = useRouter();
    const [token, setToken] = useState(null);
    const [totalReviews, setTotalReviews] = useState(0);
    const [isAdded, setIsAdded] = useState(false);
    const [interestModal, setInterestModal] = useState(false);
    const [interestStatus, setInterestStatus] = useState("");

    const storeId = props.params.detail;
    const startDate = popupData.start_date;
    const endDate = popupData.end_date;
    // start_date 변환
    const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString() : "";
    // end_date 변환
    const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString() : "";

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        // 날짜를 형식에 맞게 변환
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
    };

    const openModal = () => {
        setReviewModalOpen(true);
    };
    const openWaitingModal = () => {
        setWaitingModalOpen(true);
    };

    const openReservationModal = () => {
        setReservationModalOpen(true);
    };

    const closeModal = () => {
        setReviewModalOpen(false);
        setReservationModalOpen(false);
        setWaitingModalOpen(false);
    };

    // 예약 작성 완료 시 호출되는 함수
    const handleReservationSubmit = () => {
        // 예약 작성 완료 후 할 일 추가
        closeModal();
        setIsReservationCompleted(true); // 예약이 완료되었음을 상태에 반영
        window.alert("사전예약이 완료되었습니다!");
    };
    // 웨이팅 완료 시 호출되는 함수
    const handleWaitingSubmit = () => {
        closeModal();
        setIsWaitingCompleted(true); // 예약이 완료되었음을 상태에 반영
        window.alert("현장대기 접수가 완료되었습니다!");
    };

    // 각 리뷰의 이미지 랩 상태를 추적하는 상태
    const [reviewImgWrapOpen, setReviewImgWrapOpen] = useState([]);

    // 특정 리뷰의 이미지 랩을 토글하는 함수
    const toggleReviewImgWrap = (index) => {
        const updatedImgWrapOpen = [...reviewImgWrapOpen];
        updatedImgWrapOpen[index] = !updatedImgWrapOpen[index];
        setReviewImgWrapOpen(updatedImgWrapOpen);
    };

    // 이미지 랩이 열려있을 때와 닫혀있을 때에 따라 버튼 텍스트 설정
    const getButtonText = (index) => {
        return reviewImgWrapOpen[index] ? "이미지 접기 ▲" : "이미지 보기 ▼";
    };

    // 리뷰 작성 완료 시 호출되는 함수
    const handleReviewSubmit = () => {
        closeModal();
        setIsReviewSubmitted(false); //!! false로 바꿔준다
        window.alert("후기가 작성되었습니다!");
    };
    async function addInterestPopupStore(storeId) {
        try {
            const response = await instance.post("/interest", {
                popupStoreId: storeId,
            });
            if (response.status === 201) {
                setIsAdded(true);
                setInterestModal(true);
                setInterestStatus("add");
            }
        } catch (err) {
            console.log(err);
        }
    }
    async function deleteInterestPopupStore(storeId) {
        try {
            const response = await instance.delete(`/interest/${storeId}`);
            if (response.data.deletedCount === 1) {
                setIsAdded(false);
                setInterestModal(true);
                setInterestStatus("delete");
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            const accessToken = localStorage.getItem("accessToken");
            setToken(accessToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            (async function () {
                const response = await instance.get(`/interest/${storeId}`);
                if (response.data.length !== 0) {
                    setIsAdded(true);
                } else {
                    setIsAdded(false);
                }
            })();
        }
    }, [token]);

    const fetchData = async () => {
        try {
            // 팝업스토어 데이터 가져오기
            const popupResponse = await instance.get(`/popupstore/${storeId}`);
            const popupData = popupResponse.data;
            setPopupData(popupData);
            const replaceDescription = popupData.description.replace(/\n/g, "\n");
            setPopupData((data) => ({ ...data, description: replaceDescription }));

            // 리뷰 데이터 가져오기 (최신순으로 데이터 받음)
            const reviewDataResponse = await instance.get(`review/byPopupstore/${storeId}`);
            const reviewData = reviewDataResponse.data;
            setReviewData(reviewData.reviewData?.slice(0, 4)); //! 리뷰 4개만 렌더링되게 slice 사용
            setTotalReviews(reviewData.totalReviews);
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };
    useEffect(
        () => {
            fetchData();
        },
        [isReviewSubmitted],
        [isReservationCompleted],
        [isWaitingCompleted]
    );

    // 현재 날짜와 시작, 끝 날짜를 비교하는 함수
    const isBefore = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return d1 < d2;
    };

    return (
        <div className="PopUp">
            {interestModal && (
                <div
                    className="modalBackground"
                    onClick={() => {
                        window.document.body.style.overflowY = "scroll";
                        setInterestModal(false);
                    }}
                ></div>
            )}
            {interestModal && (
                <div className="addInterestModal">
                    <FontAwesomeIcon className="smileIcon" icon={faFaceSmile} />
                    {interestStatus === "add" ? (
                        <div className="interestModalMessage">
                            해당 팝업스토어가 <br />
                            관심 리스트에 추가되었습니다!
                        </div>
                    ) : (
                        <div className="interestModalMessage">
                            해당 팝업스토어가 <br />
                            관심 리스트에서 삭제되었습니다!
                        </div>
                    )}
                    {interestStatus === "add" ? (
                        <div className="subText">마이페이지에서 관심 리스트를 확인하실 수 있습니다.</div>
                    ) : (
                        <div className="subText">마이페이지에서 관심 리스트를 확인하실 수 있습니다.</div>
                    )}
                    <div className="modalBtnWrapper">
                        <div
                            className="listMoveBtn"
                            onClick={() => {
                                window.document.body.style.overflowY = "scroll";
                                router.push("/mypage");
                            }}
                        >
                            마이페이지 이동
                        </div>
                        <div
                            className="okBtn"
                            onClick={() => {
                                window.document.body.style.overflowY = "scroll";
                                setInterestModal(false);
                            }}
                        >
                            확인
                        </div>
                    </div>
                </div>
            )}
            <div className="popImgWrap">
                <div className="mainImg">
                    <img src={popupData.mainImage?.url} alt="" />
                </div>
                <div className="subImg">
                    <div className="subImg1">
                        <img src={popupData.images?.[0]?.url} alt="" />
                    </div>
                    <div className="subImg2">
                        <img src={popupData.images?.[1]?.url} alt="" />
                    </div>
                </div>
            </div>
            <div className="popInfo">
                <h1>
                    {popupData.name}
                    <a href="#">{popupData.category}</a>
                    {!isAdded ? (
                        <FontAwesomeIcon
                            className="heartIcon"
                            icon={regularHeart}
                            onClick={() => {
                                if (!token) {
                                    alert("로그인 후 이용하실 수 있습니다.");
                                    router.push("/login");
                                    return;
                                }
                                window.document.body.style.overflowY = "hidden";
                                addInterestPopupStore(storeId);
                            }}
                        />
                    ) : (
                        <FontAwesomeIcon
                            className="heartIcon"
                            icon={solidHeart}
                            onClick={() => {
                                if (token) {
                                    window.document.body.style.overflowY = "hidden";
                                    deleteInterestPopupStore(storeId);
                                }
                            }}
                        />
                    )}
                </h1>
                <b>
                    <FontAwesomeIcon className="icon" icon={faLocationDot} />
                    {popupData.address}
                </b>
                <p>
                    {formattedStartDate}~{formattedEndDate}
                </p>
            </div>
            <div className="popTime">
                <h3>■ 운영시간 안내</h3>
                <ul>
                    <li>월 11:00 ~ 18:00</li>
                    <li>화 11:00 ~ 18:00</li>
                    <li>수 11:00 ~ 18:00</li>
                    <li>목 11:00 ~ 18:00</li>
                    <li>금 11:00 ~ 18:00</li>
                </ul>
            </div>
            <div className="popInfo2">
                <h3 className="popInfoSubTtile">■ 팝업스토어 내용</h3>
                <p>{popupData.description}</p>
            </div>
            <div className="popReview">
                <h4>
                    <b>
                        후기 <FontAwesomeIcon className="staricon" icon={faStar} style={{ color: "#e21680" }} />
                        <span>{totalReviews}개</span>
                    </b>
                    <Link href={`/popupList/all/${props.params.detail}/reviews`}>전체보기</Link>
                </h4>
                <div className="popReviewList">
                    {reviewData.map((review, index) => (
                        <div className="popReviewListItem" key={index}>
                            <div className="top">
                                <h3>{review.name}</h3>
                                <h4>{formatDate(review.created_at)}</h4>
                            </div>
                            <div className="cont">
                                <p>{review.text}</p>
                            </div>
                            <button type="button" className="imgToggleBtn" onClick={() => toggleReviewImgWrap(index)}>
                                {getButtonText(index)}
                            </button>
                            <div className="img">
                                <div className={`img_wrap ${reviewImgWrapOpen[index] ? "open" : "closed"}`}>
                                    <div className="img_wrap2">
                                        <div className="img1">
                                            {review.image && review.image[0] && (
                                                <img src={review.image[0].url} alt="" />
                                            )}
                                        </div>
                                        <div className="img1">
                                            {review.image && review.image[1] && (
                                                <img src={review.image[1].url} alt="" />
                                            )}
                                        </div>
                                        <div className="img1">
                                            {review.image && review.image[2] && (
                                                <img src={review.image[2].url} alt="" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    onClick={() => {
                        if (!token) {
                            alert("로그인 후 이용하실 수 있습니다.");
                            router.push("/login");
                            return;
                        }
                        window.document.body.style.overflowY = "hidden";
                        openModal();
                    }}
                >
                    후기 작성하기
                </button>
            </div>
            <div className="popLocation">
                <h3>■ 상세위치</h3>
                <b>
                    {popupData.address} {popupData.name}
                </b>
            </div>
            <div className="popWarning">
                <h3>■ 안내 및 주의사항</h3>
                <ul>
                    <li>* 별도의 주차 장소가 없으니 대중교통과 주변 공용 주차장 이용 부탁 드립니다.</li>
                </ul>
            </div>
            {isBefore(new Date(), new Date(startDate)) && isBefore(new Date(), new Date(endDate)) ? (
                <div className="reserveBtn">
                    <button
                        type="button"
                        onClick={() => {
                            if (!token) {
                                alert("로그인 후 이용하실 수 있습니다.");
                                router.push("/login");
                                return;
                            }
                            window.document.body.style.overflowY = "hidden";
                            openReservationModal();
                        }}
                        disabled={isReservationCompleted} // 예약이 완료되면 버튼을 비활성화
                    >
                        {isReservationCompleted ? "사전예약이 완료되었습니다." : "사전예약하기"}
                    </button>
                </div>
            ) : isBefore(new Date(), new Date(endDate)) ? (
                <div className="reserveBtn">
                    <button
                        type="button"
                        onClick={() => {
                            if (!token) {
                                alert("로그인 후 이용하실 수 있습니다.");
                                router.push("/login");
                                return;
                            }
                            window.document.body.style.overflowY = "hidden";
                            openWaitingModal();
                        }}
                    >
                        현장대기
                    </button>
                </div>
            ) : (
                <p className="endPopupStoreMsg">종료된 팝업 스토어입니다.</p>
            )}
            {/* NewModal 렌더링 */}
            {reservationModalOpen && (
                <ReservationModal
                    closeModal={closeModal}
                    handleReservationSubmit={handleReservationSubmit}
                    popupStoreId={storeId}
                    startDate={startDate}
                    endDate={endDate}
                />
            )}
            {/* ReviewModal을 여기에 렌더링 */}
            {reviewModalOpen && (
                <ReviewModal
                    closeModal={closeModal}
                    handleReviewSubmit={handleReviewSubmit}
                    popupStoreId={storeId}
                    setIsReviewSubmitted={setIsReviewSubmitted}
                />
            )}
            {/* WaitingModal을 여기에 추가 */}
            {waitingModalOpen && (
                <WaitingModal
                    closeModal={closeModal}
                    popupStoreId={storeId}
                    handleWaitingSubmit={handleWaitingSubmit}
                />
            )}
        </div>
    );
}
