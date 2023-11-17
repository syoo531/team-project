import WeekPopUp from "./components/weekPopUp/WeekPopUp";
import Recommendation from "./components/recommendation/recommendation";
import RollingBanner from "./components/rollingBanner/RollingBanner";
import "./Home.scss";

export default function Home() {
  return (
    <div className="home">
      <div className="video"></div>
      <RollingBanner />
      <WeekPopUp />
      <Recommendation />
    </div>
  );
}
