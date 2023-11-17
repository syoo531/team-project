import "./WeekPopUp.scss";

const popUpArr = new Array(2).fill(0);

export default function WeekPopUp() {
  return (
    <div className="weekPopUp">
      <div className="titleWrapper">
        <div className="title">이번 주말 가야 할 팝업!</div>
        <div className="subTitle">
          이색적인 컨셉에 재미있게 즐길 수 있는 핫플,
          <br /> 팝스팟이 소개하는 주목할 만한 팝업스토어를 경험해 보세요.
        </div>
      </div>

      <div className="popUpListWrapper">
        {popUpArr.map((el) => {
          return (
            <div className="popUpWrapper">
              <div className="backGround"></div>
              <div className="contentWrapper">
                <div className="popUpBrand">Spotify</div>
                <div className="popUpTitle">
                  뉴진스 ✕ 스포티파이 Bunnyland 팝업 스토어
                </div>
                <div className="popUpSummary">
                  버니랜드에서 기다릴게! From.스포티버니니
                </div>
                <div className="readMoreBtn">자세히 보기</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
