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
import instance from "@/utils/instance";
config.autoAddCss = false;

// 팝업스토어 상세 페이지
export default function PopUp(props) {
    const [popupData, setPopupData] = useState({});
    const [reviewData, setReviewData] = useState([]);
    const [popupObjId, setPopupObjId] = useState(null); // useState 추가
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isReviewSubmitted, setIsReviewSubmitted] = useState(false);

    const storeId = props.params.detail;
    const startDate = popupData && popupData[storeId] && popupData[storeId].start_date;
    const endDate = popupData && popupData[storeId] && popupData[storeId].end_date;
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

    // const connectedReviewData =
    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
    const handleReviewSubmit = (reviewContent, imageData) => {
        // 리뷰 작성 완료 후 할 일 추가
        console.log("Review content submitted:", reviewContent, imageData);
        setIsReviewSubmitted(true);
        closeModal();
        window.alert("후기가 성공적으로 작성되었습니다!");
    };
    useEffect(() => {
        fetchData();
        // isReviewSubmitted 값이 변경되었을 때 페이지를 다시 렌더링
    }, [isReviewSubmitted]);

    const fetchData = async () => {
        try {
            // 팝업스토어 데이터 가져오기
            const popupResponse = await instance.get("/popupstore");
            const popupData = popupResponse.data.data;
            setPopupData(popupData);
            console.log("Popup Data:", popupData);

            const currentPopupObjId = popupData && popupData[storeId] && popupData[storeId]._id;
            setPopupObjId(currentPopupObjId); // popupObjId 업데이트

            console.log("currentPopupObjId :", currentPopupObjId);
            console.log("popupObjId :", popupObjId);

            // 리뷰 데이터 가져오기
            const reviewResponse = await instance.get("/review");
            const reviewData = reviewResponse.data;
            // setReviewData(reviewData);
            // console.log("Review Data:", reviewData);
            // const connectedReviewData = reviewData.filter((review) => {
            //     return review.popup_store && review.popup_store._id === popupData[storeId]._id;
            // });
            const connectedReviewData = reviewData
                .filter((review) => review.popup_store && review.popup_store._id === popupData[storeId]._id)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setReviewData(connectedReviewData);
            console.log("Review Data:", connectedReviewData);
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
                        src={popupData[storeId] && popupData[storeId].mainImage && popupData[storeId].mainImage.url}
                        alt=""
                    />
                </div>
                <div className="subImg">
                    <div className="subImg1">
                        <img src={popupData && popupData[storeId] && popupData[storeId].images?.[0]?.url} alt="" />
                    </div>
                    <div className="subImg2">
                        <img src={popupData && popupData[storeId] && popupData[storeId].images?.[1]?.url} alt="" />
                    </div>
                </div>
            </div>
            <div className="popInfo">
                <h1>
                    {popupData && popupData[storeId] && popupData[storeId].name}
                    <a href="#">{popupData && popupData[storeId] && popupData[storeId].category}</a>
                    <input type="checkbox" id={`detailFav${storeId}`} />
                    <label htmlFor={`detailFav${storeId}`}></label>
                </h1>
                <b>
                    <FontAwesomeIcon className="icon" icon={faLocationDot} />
                    {popupData && popupData[storeId] && popupData[storeId].location}
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
                <p>{popupData && popupData[storeId] && popupData[storeId].description}</p>
            </div>
            <div className="popReview">
                <h4>
                    <b>
                        후기 <FontAwesomeIcon className="staricon" icon={faStar} style={{ color: "#e21680" }} />
                        <span>{reviewData.length}개</span>
                    </b>
                    <a href="#">전체보기</a>
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
