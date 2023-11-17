"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import "./EndSoon.scss";

const popUpArr = new Array(8).fill(0);

export default function EndSoon() {
  const [slide, setSlide] = useState(0);
  const [count, setCount] = useState(popUpArr.length);

  function moveToLeft() {
    if (slide > 0) {
      setSlide((prev) => prev - 25);
      setCount((prev) => prev + 1);
    }
  }

  function moveToRight() {
    if (!(count < 4)) {
      setSlide((prev) => prev + 25);
      setCount((prev) => prev - 1);
    }
  }

  return (
    <div className="EndSoon">
      <div className="headerWrapper">
        <div className="title">끝나기 전에 서둘러 방문해보세요!</div>
        <div className="btnWrapper">
          <FontAwesomeIcon
            className="leftArrowIcon"
            icon={faCircleArrowLeft}
            style={{
              opacity: slide === 0 ? 0 : 1,
            }}
            onClick={moveToLeft}
          />
          <FontAwesomeIcon
            className="rightArrowIcon"
            icon={faCircleArrowRight}
            style={{ opacity: count < 4 ? 0 : 1 }}
            onClick={moveToRight}
          />
        </div>
      </div>
      <div className="popUpListWrapper">
        <div
          className="slideWrapper"
          style={{
            transform: `translate(-${slide}%)`,
          }}
        >
          {popUpArr.map((el, index) => (
            <div className="popUpWrapper" key={index}>
              <div className="Mark">
                END
                <br />
                SOON
              </div>
              <div className="remainingTime">
                <FontAwesomeIcon className="timeIcon" icon={faStopwatch} beat />
                <div className="time">종료까지 남은 시간 :</div>
              </div>
              <div className="popUpImg"></div>
              <div className="brand">해태</div>
              <div className="popUpTitle">쌍쌍바 팝업스토어</div>
              <div className="locationWrapper">
                <FontAwesomeIcon
                  className="locationIcon"
                  icon={faLocationDot}
                />
                <div className="locationText">서울 성동구 서울숲 4길 26-14</div>
              </div>
              <div className="dateWrapper">
                <FontAwesomeIcon className="dateIcon" icon={faCalendar} />
                <div className="dateText">2023.11.09 - 2023.12.22</div>
              </div>
              <div className="readMore">{"자세히 보기 >"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
