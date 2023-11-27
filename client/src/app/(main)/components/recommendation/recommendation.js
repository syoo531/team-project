"use client";
import { useEffect, useState } from "react";
import axios from "../../../../utils/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import "./recommendation.scss";

const popUpArr = new Array(8).fill(0);

export default function Recommendation() {
  const [user, setUser] = useState(null);
  const [popupStores, setPopupStores] = useState([]);
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

  useEffect(() => {
    (async function () {
      try {
        const token = localStorage.getItem("accessToken");
        if (token) {
          const response = await axios.get(`/popupList/recommend`);
          if (response.status === 200) {
            setUser(response.data.user);
            setPopupStores(response.data.popupStores);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="recommendation">
      <div className="headerWrapper">
        <div className="title">{user?.name}님을 위한 추천 팝업스토어!</div>
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
              <div className="recommedPopUpImg">
                <div className="Mark">
                  POP
                  <br />
                  UP
                </div>
              </div>
              <div className="brand">NH 올원뱅크</div>
              <div className="popUpTitle">신선놀음 팝업스토어</div>
              <div className="locationWrapper">
                <FontAwesomeIcon
                  className="locationIcon"
                  icon={faLocationDot}
                />
                <div className="locationText">
                  서울 성동구 연무장11길 13, 플란트란스 성수
                </div>
              </div>
              <div className="dateWrapper">
                <FontAwesomeIcon className="dateIcon" icon={faCalendar} />
                <div className="dateText">2023.11.15 - 2023.11.21</div>
              </div>
              <div className="readMore">{"자세히 보기 >"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
