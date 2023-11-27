"use client";
import "./page.scss";
import axios from "axios";
import ReviewModal from "./components/reviewModal/reviewModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// 팝업스토어 상세 페이지
export default function PopUp(props) {
    const [popupData, setPopupData] = useState({});
    const [reviewData, setReviewData] = useState({});
    const [popupObjId, setPopupObjId] = useState(null); // useState 추가
    const [isModalOpen, setIsModalOpen] = useState(false);

    const storeId = props.params.id;
    const startDate = popupData.data && popupData.data[storeId] && popupData.data[storeId].start_date;
    const endDate = popupData.data && popupData.data[storeId] && popupData.data[storeId].end_date;
    // start_date 변환
    const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString() : "";
    // end_date 변환
    const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString() : "";
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const [isImgWrapOpen, setImgWrapOpen] = useState(true);

    const toggleImgWrap = () => {
        setImgWrapOpen(!isImgWrapOpen);
    };
    // 이미지 랩이 열려있을 때와 닫혀있을 때에 따라 버튼 텍스트 설정
    const buttonText = isImgWrapOpen ? "이미지 펼치기 ▼" : "이미지 접기 ▲";

    // 리뷰 작성 완료 시 호출되는 함수
    const handleReviewSubmit = (reviewContent) => {
        // 리뷰 작성 완료 후 할 일 추가
        console.log("Review content submitted:", reviewContent);
        closeModal();
    };

    const fetchData = async () => {
        try {
            // 팝업스토어 데이터 가져오기
            const popupResponse = await axios.get("http://localhost:4000/api/popupstore");
            const popupData = popupResponse.data;
            setPopupData(popupData);
            console.log("Popup Data:", popupData);

            const currentPopupObjId = popupData.data && popupData.data[storeId] && popupData.data[storeId]._id;
            setPopupObjId(currentPopupObjId); // popupObjId 업데이트

            // 리뷰 데이터 가져오기
            const reviewResponse = await axios.get("http://localhost:4000/api/review");
            const reviewData = reviewResponse.data;
            setReviewData(reviewData);
            console.log("Review Data:", reviewData);
        } catch (err) {
            console.log("Error fetching data:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="PopUp">
            {/* <div>팝업스토어 id : {storeId}</div> */}
            <div className="popImgWrap">
                <div className="mainImg">
                    <img
                        src={
                            popupData.data &&
                            popupData.data[storeId] &&
                            popupData.data[storeId].mainImage &&
                            popupData.data[storeId].mainImage.url
                        }
                        alt=""
                    />
                </div>
                <div className="subImg">
                    <div className="subImg1">
                        <img
                            src={popupData.data && popupData.data[storeId] && popupData.data[storeId].images?.[0]?.url}
                            alt=""
                        />
                    </div>
                    <div className="subImg2">
                        <img
                            src={popupData.data && popupData.data[storeId] && popupData.data[storeId].images?.[1]?.url}
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="popInfo">
                <h1>
                    {popupData.data && popupData.data[storeId] && popupData.data[storeId].name}
                    <a href="#">{popupData.data && popupData.data[storeId] && popupData.data[storeId].category}</a>
                    <input type="checkbox" id={`detailFav${storeId}`} />
                    <label htmlFor={`detailFav${storeId}`}></label>
                </h1>
                <b>
                    <FontAwesomeIcon className="icon" icon={faLocationDot} />
                    {popupData.data && popupData.data[storeId] && popupData.data[storeId].location}
                </b>
                <p>
                    {formattedStartDate}~{formattedEndDate}
                </p>
            </div>
            <div className="popTime">
                <h3>운영시간 안내</h3>
                <ul>
                    <li>월 11:00 ~ 18:00</li>
                    <li>화 11:00 ~ 18:00</li>
                    <li>수 11:00 ~ 18:00</li>
                    <li>목 11:00 ~ 18:00</li>
                    <li>금 11:00 ~ 18:00</li>
                </ul>
            </div>
            <div className="popInfo2">
                <h3 className="popInfoSubTtile">팝업스토어 내용</h3>
                <p>{popupData.data && popupData.data[storeId] && popupData.data[storeId].description}</p>
            </div>
            <div className="popReview">
                <h4>
                    <h5>
                        후기 <FontAwesomeIcon className="staricon" icon={faStar} style={{ color: "#e21680" }} />
                        <span>2개</span>
                    </h5>
                    <a href="#">전체보기</a>
                </h4>
                <div className="popReviewList">
                    <div className="popReviewListItem">
                        <div className="top">
                            {/* <h2>P</h2> */}
                            <h3>김수환</h3>
                            <h4>2023. 11. 24 방문</h4>
                        </div>
                        <div className="cont">
                            <p>
                                다녀왔는데 너무너무 재미있었어요 !!!다녀왔는데 너무너무 재미있었어요 !!!다녀왔는데
                                너무너무 재미있었어요 !!!
                            </p>
                        </div>
                        <button type="button" className="imgToggleBtn" onClick={toggleImgWrap}>
                            {buttonText}
                        </button>
                        <div className="img">
                            <div className={`img_wrap ${isImgWrapOpen ? "open" : "closed"}`}>
                                <div className="img_wrap2">
                                    <div className="img1">IMG</div>
                                    <div className="img1">IMG</div>
                                    <div className="img1">IMG</div>
                                    {/* <div className="img1">IMG</div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="button" onClick={openModal}>
                    후기 작성하기
                </button>
            </div>
            <div className="popLocation">
                <h3>상세위치</h3>
                <b>더 현대 서울 3층 포켓몬스터 팝업스토어 매장</b>
                <div className="locationBox">지도표시</div>
            </div>
            <div className="popWarning">
                <h3>안내 및 주의사항</h3>
                <ul>
                    <li>* 주의사항1</li>
                    <li>* 주의사항2</li>
                    <li>* 주의사항3</li>
                </ul>
            </div>
            <div className="reserveBtn">
                <button type="button">사전예약하기</button>
            </div>
            {/* ReviewModal을 여기에 렌더링 */}
            {isModalOpen && (
                <ReviewModal
                    closeModal={closeModal}
                    handleReviewSubmit={handleReviewSubmit}
                    postId={storeId} // 스토어의 ID를 전달
                    popupStoreId={popupObjId} // 팝업스토어 오브젝트id 전달
                />
            )}
        </div>
    );
}
