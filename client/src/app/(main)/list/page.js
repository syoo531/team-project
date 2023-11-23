"use client";
import "./page.scss";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// 팝업스토어 리스트
export default function List() {
    const [popupList, setPopupListData] = useState({ data: [] });
    const popupListFetch = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/popupstore");
            const data = response.data;
            setPopupListData(data);
            console.log(data);
        } catch (err) {
            console.log("error!", err);
        }
    };
    useEffect(() => {
        popupListFetch();
    }, []);

    // List 컴포넌트 상단에 다음 상태 추가
    const [currentPage, setCurrentPage] = useState(1); //페이지
    const [itemsPerPage, setItemsPerPage] = useState(3); //페이지내에 아이템 수
    const generatorsItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const slicedData = popupList.data.slice(startIndex, endIndex);

        const items = slicedData.map((popup, index) => {
            const startDate = popup.start_date;
            const endDate = popup.end_date;
            const formattedStartDate = startDate ? new Date(startDate).toLocaleDateString() : "";
            const formattedEndDate = endDate ? new Date(endDate).toLocaleDateString() : "";

            return {
                num: startIndex + index,
                title: `${popup.name}`,
                location: `${popup.location}`,
                startDate: `${formattedStartDate}`,
                endDate: `${formattedEndDate}`,
                img: `${popup.image.main_image_url}`,
            };
        });

        return items;
    };

    const listData = generatorsItems();

    const totalPages = Math.ceil(popupList.data.length / itemsPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div className="List">
            <div className="list">
                {listData.map((item) => (
                    <div className="listItem">
                        <div className="itemImg">
                            <h1>
                                <img src={item.img} alt="" />
                            </h1>
                        </div>
                        <div className="itemInfo">
                            <div className="itemTitle">
                                <h1>
                                    <Link href={`./list/${item.num}`}>
                                        <h1>{item.title}</h1>
                                    </Link>
                                </h1>
                            </div>
                            <div className="itemLocation">
                                <FontAwesomeIcon className="icon" icon={faLocationDot} />
                                <p>{item.location}</p>
                            </div>
                            <div className="itemDate">
                                <p>
                                    {item.startDate} ~ {item.endDate}
                                </p>
                            </div>
                            <div className="itemFavorite">
                                <input type="checkbox" id={`itemFav${item.num}`} />
                                <label htmlFor={`itemFav${item.num}`}></label>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pageBtn">
                {/* 이전 페이지로 이동하는 버튼 */}
                <div className="prevBtn">
                    <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                        &#60;
                    </button>
                </div>

                {/* 페이지 번호를 나타내는 숫자 버튼들 */}
                <div className="pageNum">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            className={currentPage === index + 1 ? "active" : ""}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>

                {/* 다음 페이지로 이동하는 버튼 */}
                <div className="nextBtn">
                    <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                        &#62;
                    </button>
                </div>
            </div>
        </div>
    );
}
