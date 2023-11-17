"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "./RollingBanner.scss";

const popUpArr = new Array(6).fill(0);

export default function RollingBanner() {
  const router = useRouter();
  const [isOperated, setIsOperated] = useState({ left: true, right: true });

  return (
    <div className="rollingBanner">
      <div className="contentWrapper">
        <div className="title">서울 팝업스토어가 한곳에!</div>
        <p className="subTitle">
          아트, 뮤직, 미식, 패션, 뷰티, 캐릭터 등 <br />
          핫플레이스를 주도하는 다양한 팝업스토어를 만나보세요.
        </p>
        <div className="viewBtn" onClick={() => router.push("/list")}>
          모두 보기
        </div>
      </div>
      <div className="leftRollingWrapper">
        <div className={`moveToLeftRolling ${isOperated.left ? null : "stop"}`}>
          {popUpArr.map((el, index) => (
            <div
              key={index}
              className="popUpImg"
              onMouseEnter={() => {
                setIsOperated({ ...isOperated, left: false });
              }}
              onMouseLeave={() => {
                setIsOperated({ ...isOperated, left: true });
              }}
            >
              <div className="blackBackGround"></div>
              <div className="readMoreBtn">VIEW</div>
            </div>
          ))}
        </div>
        <div
          className={`moveToLeftRollingCopy ${isOperated.left ? null : "stop"}`}
        >
          {popUpArr.map((el, index) => (
            <div
              key={index}
              className="popUpImg"
              onMouseEnter={() => {
                setIsOperated({ ...isOperated, left: false });
              }}
              onMouseLeave={() => {
                setIsOperated({ ...isOperated, left: true });
              }}
            >
              <div className="blackBackGround"></div>
              <div className="readMoreBtn">VIEW</div>
            </div>
          ))}
        </div>
      </div>
      <div className="rightRollingWrapper">
        <div
          className={`moveToRightRolling ${isOperated.right ? null : "stop"}`}
        >
          {popUpArr.map((el, index) => (
            <div
              key={index}
              className="popUpImg"
              onMouseEnter={() => {
                setIsOperated({ ...isOperated, right: false });
              }}
              onMouseLeave={() => {
                setIsOperated({ ...isOperated, right: true });
              }}
            >
              <div className="blackBackGround"></div>
              <div className="readMoreBtn">VIEW</div>
            </div>
          ))}
        </div>
        <div
          className={`moveToRightRollingCopy ${
            isOperated.right ? null : "stop"
          }`}
        >
          {popUpArr.map((el, index) => (
            <div
              key={index}
              className="popUpImg"
              onMouseEnter={() => {
                setIsOperated({ ...isOperated, right: false });
              }}
              onMouseLeave={() => {
                setIsOperated({ ...isOperated, right: true });
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
