import WeekPopUp from "./components/weekPopUp/WeekPopUp";
import Recommendation from "./components/recommendation/recommendation";
import RollingBanner from "./components/rollingBanner/RollingBanner";
import EndSoon from "./components/endSoon/EndSoon";
import SeongsuPopUp from "./components/SeongsuPopUp/SeongsuPopUp";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <div className="video"></div>
      <RollingBanner />
      <WeekPopUp />
      <Recommendation />
      <SeongsuPopUp />
      <EndSoon />
    </div>
  );
}
