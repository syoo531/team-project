"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import "./recommendation.scss";
import { useState } from "react";

const popUpArr = new Array(7).fill(0);

export default function Recommendation() {
  const [slide, setSlide] = useState(0);

  return (
    <div className="recommendation">
      <div className="headerWrapper">
        <div className="title">OOO님을 위한 추천 팝업스토어!</div>
        <div className="btnWrapper">
          <FontAwesomeIcon
            className="leftArrowIcon"
            icon={faCircleArrowLeft}
            onClick={() => {
              setSlide((prev) => prev + 25);
            }}
          />
          <FontAwesomeIcon
            className="rightArrowIcon"
            icon={faCircleArrowRight}
          />
        </div>
      </div>
      <div className="popUpListWrapper">
        <div
          className="slideWrapper"
          style={{ transform: `translate(-${slide}%)` }}
        >
          {popUpArr.map((el) => (
            <div className="popUpWrapper">
              <div className="popUpMark">
                POP
                <br />
                UP
              </div>
              <div className="popUpImg"></div>
              <div className="brand">더 현대</div>
              <div className="popUpTitle">LA BOUTIQUE D’ HARRY</div>
              <div className="locationWrapper">
                <FontAwesomeIcon
                  className="locationIcon"
                  icon={faLocationDot}
                />
                <div className="locationText">
                  서울 영등포구 여의대로 108 더현대 서울
                </div>
              </div>
              <div className="dateWrapper">
                <FontAwesomeIcon className="dateIcon" icon={faCalendar} />
                <div className="dateText">2023.11.28 - 2023.12.03</div>
              </div>
              <div className="readMore">{"자세히 보기 >"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
