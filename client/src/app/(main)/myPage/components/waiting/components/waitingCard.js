import "./waitingCard.scss";

export default function WaitingCard(data) {
  return (
    <div className="waitingCardContainer">
      <div className="waitingCard">
        <div className="imgWrapper">
          <img src={`${data[2]}`} />
        </div>
        <div className="dataWrapper">
          <div className="popupName">{data[0]}</div>
          {data[1] === 0 ? (
            <div className="nowEnter">지금 입장해주세요!</div>
          ) : (
            <>
              <div className="infrontMe">내 앞에 대기팀</div>
              <div className="team">{data[1]}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
