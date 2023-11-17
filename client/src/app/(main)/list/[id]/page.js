import "./page.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

// 팝업스토어 상세 페이지
export default function PopUp(props) {
    return (
        <div className="PopUp">
            <div>팝업스토어 id : {props.params.id}</div>
            <div className="popImgWrap">
                <div className="mainImg">Main IMG</div>
                <div className="subImg">
                    <div className="subImg">Sub IMG 1</div>
                    <div className="subImg">Sub IMG 2</div>
                    <div className="subImg">Sub IMG 3</div>
                    <div className="subImg">Sub IMG 4</div>
                </div>
            </div>
            <div className="popInfo">
                <h1>
                    포켓몬스터 팝업스토어<a href="#">카테고리</a>
                </h1>
                <b>
                    <FontAwesomeIcon className="icon" icon={faLocationDot} />
                    서울시 강남구
                </b>
                <p>2023.11.01 ~ 2023.11.31</p>
            </div>
            <div className="popInfo2">
                <h3 className="popInfoSubTtile">팝업스토어 내용</h3>
                <p>팝업스토어 상세내용 들어갑니다.</p>
            </div>
            <div className="popLocation">
                <h3>상세위치</h3>
                <b>더 현대 서울 3층 포켓몬스터 팝업스토어 매장</b>
                <div className="locationBox">지도표시</div>
            </div>
            <div className="popWarning">
                <h3>안내 및 주의사항</h3>
                <ul>
                    <li>1. 주의사항1</li>
                    <li>2. 주의사항2</li>
                    <li>3. 주의사항3</li>
                </ul>
            </div>
        </div>
    );
}
