"use client";
import { useEffect, useState } from "react";
import axios from "../../../../utils/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import EndSoonPopupStore from "./components/endSoonPopupStore/EndSoonPopupStore";
import "./EndSoon.scss";

const popUpArr = new Array(8).fill(0);

export default function EndSoon() {
  const [popupStores, setPopupStores] = useState([]);
  const [slide, setSlide] = useState(0);
  const [count, setCount] = useState(popUpArr.length);

  console.log(popupStores);

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
        const response = await axios.get(`/popupList/endSoon`);
        if (response.status === 200) {
          setPopupStores(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

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
            <EndSoonPopupStore key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
