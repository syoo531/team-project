"use client";
import "./interestCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

//카드에 들어갈 정보
// 1. 팝업스토어 이름(보내줄때 한번에 ) 2. 예약날자 3. 예약시간 4. 일행
export default function InterestCard(data) {
  console.log("여기22", data);
  console.log("여기33", data.popup_store._id);
  const url = `/popupList/all/${data.popup_store._id}`;
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `${url}`;
  };

  return (
    <div className="reservationCardContainer">
      <div className="Card" onClick={handleClick}>
        <div className="imgWrapper">
          <img
            src={`${data.popup_store.mainImage.url}`}
            alt={`${data.popup_store.name}`}
          />
        </div>
        <div className="dataWrapper">
          <div className="popupName">{data.popup_store.name}</div>
          <div className="bookmark">
            <FontAwesomeIcon icon={faBookmark} size="2x" />
          </div>
        </div>
      </div>
    </div>
  );
}
