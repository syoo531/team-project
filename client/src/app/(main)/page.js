import Recommendation from "./components/recommendation/recommendation";
import RollingBanner from "./components/rollingBanner/RollingBanner";
import "./main.scss";

export default function Home() {
  return (
    <div className="home">
      <div className="video"></div>
      <RollingBanner />
      <Recommendation />
    </div>
  );
}
