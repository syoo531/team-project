"use client";
import { useState } from "react";
import axios from "../../../../../utils/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as regularBookmark } from "@fortawesome/free-regular-svg-icons";
import "./PopupStore.scss";

export default function PopupStore() {
  const [bookmark, setBookmark] = useState(false);
  const [bookmarkModal, setBookmarkModal] = useState(false);

  async function addInterestPopupStore() {
    try {
      const response = await axios.post("/interest", {
        popupStoreId: "65624e94cc9ab80d647bd64e",
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const response = await axios.get(`/interest/65624e94cc9ab80d647bd64e`);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   })();
  // }, []);

  return (
    <div className="popupStore">
      {bookmarkModal && <div className="modalBackground"></div>}
      {bookmarkModal && (
        <div className="addInterestModal">
          <FontAwesomeIcon className="smileIcon" icon={faFaceSmile} />
          <div className="successMessage">
            관심 팝업스토어가 추가되었습니다!
          </div>
          <div className="subText">
            마이페이지 관심 팝업스토어 탭에서
            <br />
            추가하신 리스트를 확인하실 수 있습니다.
          </div>
          <div className="modalBtnWrapper">
            <div className="listMoveBtn">관심 리스트 이동</div>
            <div
              className="okBtn"
              onClick={() => {
                window.document.body.style.overflowY = "scroll";
                setBookmarkModal(false);
              }}
            >
              확인
            </div>
          </div>
        </div>
      )}
      <div className="popupStoreImg">
        <div className="operationalStatus">현재 운영중</div>
      </div>
      <div className="popupStoreInfoWrapper">
        <div className="infoTop">
          <div className="brandBookmarkWrapper">
            <div className="popupStoreBrand">NH 올원뱅크</div>
            {bookmark ? (
              <FontAwesomeIcon
                className="bookmarkIcon"
                icon={solidBookmark}
                onClick={() => {
                  setBookmark(false);
                  setBookmarkModal(false);
                }}
              />
            ) : (
              <FontAwesomeIcon
                className="bookmarkIcon"
                icon={regularBookmark}
                onClick={() => {
                  window.document.body.style.overflowY = "hidden";
                  setBookmark(true);
                  setBookmarkModal(true);
                  addInterestPopupStore();
                }}
              />
            )}
          </div>
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
