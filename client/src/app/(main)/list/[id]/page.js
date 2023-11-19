"use client";
import "./page.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// 팝업스토어 상세 페이지
export default function PopUp(props) {
    const path = usePathname();
    const storeId = props.params.id;
    const [popupData, setPopupData] = useState({});
    const startDate = popupData.data && popupData.data[storeId] && popupData.data[storeId].start_date;
    const endDate = popupData.data && popupData.data[storeId] && popupData.data[storeId].end_date;

    // start_date 변환
    const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString() : "";

    // end_date 변환
    const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString() : "";
    const popupFetch = async () => {
        try {
            const response = await fetch("http://localhost:4000/popupstore");
            const data = await response.json();
            setPopupData(data);
        } catch (err) {
            console.log("error!", err);
        }
    };
    useEffect(() => {
        popupFetch();
    }, []);

    return (
        <div className="PopUp">
            <div>팝업스토어 id : {storeId}</div>
            <div className="popImgWrap">
                <div className="mainImg">
                    <img
                        src={popupData.data && popupData.data[storeId] && popupData.data[storeId].image.main_image_url}
                        alt=""
                    />
                </div>
                <div className="subImg">
                    <div className="subImg1">
                        <img
                            src={
                                popupData.data &&
                                popupData.data[storeId] &&
                                popupData.data[storeId].image.thumbnail_image_url
                            }
                            alt=""
                        />
                    </div>
                    <div className="subImg2">
                        <img
                            src={
                                popupData.data &&
                                popupData.data[storeId] &&
                                popupData.data[storeId].image.detail_image_url
                            }
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="popInfo">
                <h1>
                    {popupData.data && popupData.data[storeId] && popupData.data[storeId].name}
                    <a href="#">{popupData.data && popupData.data[storeId] && popupData.data[storeId].category}</a>
                </h1>
                <b>
                    <FontAwesomeIcon className="icon" icon={faLocationDot} />
                    {popupData.data && popupData.data[storeId] && popupData.data[storeId].location}
                </b>
                <p>
                    {formattedStartDate}~{formattedEndDate}
                </p>
            </div>
            <div className="popInfo2">
                <h3 className="popInfoSubTtile">팝업스토어 내용</h3>
                <p>{popupData.data && popupData.data[storeId] && popupData.data[storeId].summary}</p>
            </div>
            <div className="popLocation">
                <h3>상세위치</h3>
                <b>더 현대 서울 3층 포켓몬스터 팝업스토어 매장</b>
                <div className="locationBox">지도표시</div>
            </div>
            <div className="popWarning">
                <h3>안내 및 주의사항</h3>
                <ul>
                    <li>1. 주의사항1</li>
                    <li>2. 주의사항2</li>
                    <li>3. 주의사항3</li>
                </ul>
            </div>
            <div className="reserveBtn">
                <button type="button">사전예약하기</button>
            </div>
        </div>
    );
}
