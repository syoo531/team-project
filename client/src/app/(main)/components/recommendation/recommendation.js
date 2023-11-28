"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../utils/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import "./recommendation.scss";

export default function Recommendation() {
  const [user, setUser] = useState(null);
  const [popupStores, setPopupStores] = useState([]);
  const [slide, setSlide] = useState(0);
  const [count, setCount] = useState(0);
  const router = useRouter();

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
            setCount(response.data.popupStores.length);
          }
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  function dateFormat(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  }

  if (popupStores.length !== 0) {
    return (
      <div className="recommendation">
        <div className="headerWrapper">
          <div className="title">{user.name}님을 위한 추천 팝업스토어!</div>
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
            {popupStores.map((store) => (
              <div className="popUpWrapper" key={store._id}>
                <div
                  className="recommendPopUpImg"
                  style={{ backgroundImage: `url(${store.mainImage.url})` }}
                  onClick={() => {
                    router.push(`/popupList/all/${store._id}`);
                  }}
                >
                  <div className="Mark">
                    POP
                    <br />
                    UP
                  </div>
                </div>
                <div className="brand">{store.brand}</div>
                <div className="popUpTitle">{store.name}</div>
                <div className="locationWrapper">
                  <FontAwesomeIcon
                    className="locationIcon"
                    icon={faLocationDot}
                  />
                  <div className="locationText">{store.address}</div>
                </div>
                <div className="dateWrapper">
                  <FontAwesomeIcon className="dateIcon" icon={faCalendar} />
                  <div className="dateText">
                    {dateFormat(new Date(store.start_date))} -{" "}
                    {dateFormat(new Date(store.end_date))}
                  </div>
                </div>
                <div
                  className="readMore"
                  onClick={() => {
                    router.push(`/popupList/all/${store._id}`);
                  }}
                >
                  {"자세히 보기 >"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
