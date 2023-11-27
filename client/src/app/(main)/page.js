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
          src="/mainBanner3.mp4"
          type="video/mp4"
          autoPlay
          muted
          playsInline
        ></video>
      </div>
      <RollingBanner />
      <WeekPopUp />
      <EndSoon />
      <SeongsuPopUp />
      <Recommendation />
    </div>
  );
}
