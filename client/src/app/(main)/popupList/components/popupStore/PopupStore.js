"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import "./PopupStore.scss";

export default function PopupStore() {
  return (
    <div className="popupStore">
      <div className="popupStoreImg">
        <div className="operationalStatus">현재 운영중</div>
      </div>
      <div className="popupStoreInfoWrapper">
        <div className="infoTop">
          <div className="popupStoreBrand">NH 올원뱅크</div>
          <div className="popupStoreName">신선놀음 팝업스토어</div>
          <div className="popupStoreAddress">
            <FontAwesomeIcon className="addressIcon" icon={faLocationDot} />
            <div className="addressText">
              서울 성동구 연무장 11길 13, 플란트란스 성수
            </div>
          </div>
          <div className="popupStorePeriod">
            <FontAwesomeIcon className="periodIcon" icon={faCalendar} />
            <div className="periodText">2023.11.12 ~ 2023.11.28</div>
          </div>
        </div>

        <div className="infoBottom">
          <div className="standbyState">대기 없음</div>
          <div className="readMore">{"자세히 보기 >"}</div>
        </div>
      </div>
    </div>
  );
}
