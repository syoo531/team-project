"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "../../../../utils/instance";
import "./RollingBanner.scss";

export default function RollingBanner() {
  const [popupStores, setPopupStores] = useState([]);
  const router = useRouter();

  const topArr = popupStores.slice(0, Math.ceil(popupStores.length / 2));
  const bottomArr = popupStores.slice(Math.ceil(popupStores.length / 2));

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`/popupList`);
        if (response.status === 200) {
          setPopupStores(response.data);
        }
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <div className="rollingBanner">
      <div className="contentWrapper">
        <div className="title">서울 팝업스토어가 한곳에!</div>
        <p className="subTitle">
          아트, 뮤직, 미식, 패션, 뷰티, 캐릭터 등 <br />
          핫플레이스를 주도하는 다양한 팝업스토어를 만나보세요.
        </p>
        <div
          className="viewBtn"
          onClick={() => router.push("/popupList/all?pageNumber=1&limit=8")}
        >
          모두 보기
        </div>
      </div>
      <div className="leftRollingWrapper">
        <div className="moveToLeftRolling">
          {topArr.map((store) => (
            <div
              key={store._id}
              className="popUpImg"
              style={{ backgroundImage: `url(${store.mainImage.url})` }}
              onClick={() => {
                router.push(`/popupList/all/${store._id}`);
              }}
            >
              <div className="blackBackGround"></div>
              <div className="readMoreBtn">VIEW</div>
            </div>
          ))}
        </div>
        <div className="moveToLeftRollingCopy">
          {topArr.map((store) => (
            <div
              key={store._id}
              className="popUpImg"
              style={{ backgroundImage: `url(${store.mainImage.url})` }}
              onClick={() => {
                router.push(`/popupList/all/${store._id}`);
              }}
            >
              <div className="blackBackGround"></div>
              <div className="readMoreBtn">VIEW</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rightRollingWrapper">
        <div className="moveToRightRolling">
          {bottomArr.map((store) => (
            <div
              key={store._id}
              className="popUpImg"
              style={{ backgroundImage: `url(${store.mainImage.url})` }}
              onClick={() => {
                router.push(`/popupList/all/${store._id}`);
              }}
            >
              <div className="blackBackGround"></div>
              <div className="readMoreBtn">VIEW</div>
            </div>
          ))}
        </div>
        <div className="moveToRightRollingCopy">
          {bottomArr.map((store) => (
            <div
              key={store._id}
              className="popUpImg"
              style={{ backgroundImage: `url(${store.mainImage.url})` }}
              onClick={() => {
                router.push(`/popupList/all/${store._id}`);
              }}
            >
              <div className="blackBackGround"></div>
              <div className="readMoreBtn">VIEW</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
