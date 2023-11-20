// 마이페이지
import "./page.scss";
import MenuBar from "../components/menuBar/MenuBar";

export default function MyPageHome() {
  return (
    <div className="menuMyPageHomeContainer">
      <MenuBar />
      <div className="myPageHomeContainer">
        <div className="waitingReviewContainer">
          <div className="waitingContainer">
            <div className="popUpStoreName">
              더 현대 서울 3층 포켓몬스터 팝업스토어 매장
            </div>
            <div className="waitingTimeContainer">
              <div className="waitingInfoWrapper">
                <div className="waitingTeamText">대기중</div>
                <div className="waitingTimeText">638팀</div>
              </div>
              <div className="waitingNumWrapper">
                <div className="waitingTeamText">대기시간</div>
                <div className="waitingTimeText">약 287분</div>
              </div>
            </div>
            <div className="waitingInfoButton">
              <div className="waitingButtonText">웨이팅 정보 수정</div>
            </div>
            <div className="waitingInfoButton">
              <div className="waitingButtonText">웨이팅 취소</div>
            </div>
            <div className="dividerLine"></div>
            <div className="waitingInfoFooter">
              Nintendo POP-UP STORE in SEOUL
            </div>
            <div className="waitingInfoFooter">
              서울 용산구 한강대로23길 55 용산아이파크몰 리빙파크 3F
            </div>
          </div>
          <div className="myPageReviewContainer">
            <div className="myPageReviewTitle">실시간 베스트 리뷰</div>
          </div>
        </div>
        <div className="favPopUpStore">
          <div>
            <div>관심 팝업스토어 ❤️</div>
          </div>
        </div>
      </div>
    </div>
  );
}
