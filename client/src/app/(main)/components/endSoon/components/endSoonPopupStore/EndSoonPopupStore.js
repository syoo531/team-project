"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faStopwatch } from "@fortawesome/free-solid-svg-icons";
import "./EndSoonPopupStore.scss";

export default function EndSoonPopupStore({ store }) {
  const router = useRouter();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  function dateFormat(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  }

  const targetDate = new Date(store.end_date);

  useEffect(() => {
    const updateCountdown = () => {
      const currentDate = new Date();
      const timeDiff = targetDate.getTime() - currentDate.getTime();

      if (timeDiff > 0) {
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        clearInterval(intervalId);
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // 초기 업데이트 호출
    updateCountdown();

    // 1초마다 업데이트
    const intervalId = setInterval(updateCountdown, 1000);

    // 컴포넌트 언마운트 시 clearInterval 호출하여 메모리 누수 방지
    return () => clearInterval(intervalId);
  }, []); // targetDate가 변경될 때마다 업데이트

  return (
    <div className="endSoonPopupStore">
      <div className="remainingTime">
        <FontAwesomeIcon className="timeIcon" icon={faStopwatch} beat />
        <div className="time">
          남은 시간 :{" "}
          {`${timeRemaining.days}일 ${timeRemaining.hours}시간 ${timeRemaining.minutes}분 ${timeRemaining.seconds}초`}
        </div>
      </div>
      <div
        className="endSoonPopUpImg"
        style={{ backgroundImage: `url(${store.mainImage.url})` }}
        onClick={() => {
          router.push(`/popupList/all/${store._id}`);
        }}
      >
        <div className="Mark">
          END
          <br />
          SOON
        </div>
      </div>
      <div className="brand">{store.brand}</div>
      <div className="popUpTitle">{store.name}</div>
      <div className="locationWrapper">
        <FontAwesomeIcon className="locationIcon" icon={faLocationDot} />
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
  );
}
