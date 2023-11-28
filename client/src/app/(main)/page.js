import WeekPopUp from "./components/weekPopUp/WeekPopUp";
import Recommendation from "./components/recommendation/recommendation";
import RollingBanner from "./components/rollingBanner/RollingBanner";
import EndSoon from "./components/endSoon/EndSoon";
import SeongsuPopUp from "./components/SeongsuPopUp/SeongsuPopUp";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <div className="mainBannerWrapper">
        <video
          className="mainBanner"
          src="/mainBanner4.mp4"
          type="video/mp4"
          autoPlay
          muted
          playsInline
        ></video>
        <div className="titleWrapper">
          <div className="mainBannerTitle">새로운 팝업스토어 소식</div>
          <div className="mainBannerSubTitle">
            가장 빠르게 만날 수 있는 곳<span>,</span> 팝스팟<span>!</span>
          </div>
        </div>
        {/* <div className="mainBannerTitle">
          요즘 뜨는 트렌드가 궁금하다면,
          <br />
          매일 새로운 팝업스토어를 만나보세요!
        </div> */}
      </div>
      <RollingBanner />
      <WeekPopUp />
      <Recommendation />
      <SeongsuPopUp />
      <EndSoon />
    </div>
  );
}
