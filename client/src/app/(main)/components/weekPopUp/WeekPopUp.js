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
        {popUpArr.map((el, index) => {
          return (
            <div className="popUpWrapper" key={index}>
              <div className="backGround"></div>
              <div className="contentWrapper">
                <div className="popUpBrand">선양 소주</div>
                <div className="popUpTitle">
                  어른들의 놀이터: 선양 소주 팝업스토어
                </div>
                <div className="popUpSummary">
                  선양을 보고 느낄 수 있는 다양한 전시, 체험 공간을 통해 선양에
                  퐁당 빠져볼까요?
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
