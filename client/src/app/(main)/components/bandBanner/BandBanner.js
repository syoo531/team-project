import "./BandBanner.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt } from "@fortawesome/free-solid-svg-icons";

const text = "INSPIRE TRENDS POP-UP!";
const textArray = new Array(10).fill(text);

export default function BandBanner() {
  return (
    <div className="bandBanner">
      <div className="loopWrapper">
        {textArray.map((text, index) => (
          <div className="textWrapper" key={index}>
            <div className="text">{text}</div>
            <FontAwesomeIcon className="icon" icon={faBolt} />
          </div>
        ))}
      </div>
      <div className="loopWrapperCopy">
        {textArray.map((text, index) => (
          <div className="textWrapper" key={index}>
            <div className="text">{text}</div>
            <FontAwesomeIcon className="icon" icon={faBolt} />
          </div>
        ))}
      </div>
    </div>
  );
}
