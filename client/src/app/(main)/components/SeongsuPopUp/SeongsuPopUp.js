"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "../../../../utils/instance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./SeongsuPopUp.scss";

export default function SeongsuPopUp() {
  const [popupStores, setPopupStores] = useState([]);
  const [count, setCount] = useState(0);
  const [carousel, setCarousel] = useState(0);
  const router = useRouter();

  console.log(count);

  function moveToLeft() {
    setCarousel(carousel + 100);
    setCount(count + 1);
  }

  function moveToRight() {
    setCarousel(carousel - 100);
    setCount(count - 1);
  }

  useEffect(() => {
    (async function () {
      const response = await axios.get("/popupList/seongsu");
      setPopupStores(response.data);
      setCount(Math.floor(response.data.length / 3));
    })();
  }, []);

  return (
    <div className="seongsuPopUp">
      <div className="title">
        팝업스토어의 성지, 성수동!
        <br /> 어디까지 가봤니?
      </div>
      <div className="bannerContainer">
        <div
          className="bannerWrapper"
          style={{ transform: `translateX(${carousel}%)` }}
        >
          {popupStores.map((store) => {
            return (
              <div className="seongsuPopUpWrapper" key={store._id}>
                <div
                  className="popupImage"
                  style={{ backgroundImage: `url(${store.mainImage.url})` }}
                >
                  <div className="blackBackground"></div>
                  <div className="contentWrapper">
                    <div className="popupBrand">{store.brand}</div>
                    <div className="popupName">{store.name}</div>
                    <div className="popupintroduction">{store.summary}</div>
                    <div
                      className="readMore"
                      onClick={() => {
                        router.push(`/popupList/all/${store._id}`);
                      }}
                    >
                      자세히 보기
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {count < Math.floor(popupStores.length / 3) && (
          <FontAwesomeIcon
            className="leftArrowIcon"
            icon={faCircleChevronLeft}
            onClick={moveToLeft}
          />
        )}

        {count > 0 && (
          <FontAwesomeIcon
            className="rightArrowIcon"
            icon={faCircleChevronRight}
            onClick={moveToRight}
          />
        )}
      </div>
    </div>
  );
}
